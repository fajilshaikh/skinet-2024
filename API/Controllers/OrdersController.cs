
using API.DTOs;
using API.Extensions;
using API.RequestHelpers;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController(ICartService cartService, IUnitOfWork unit) : BaseApiController
    {

        [InvalidateCache("api/products|")]
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var email = User.GetEmail();
            var cart = await cartService.GetCartAsync(orderDto.CartId);
            if (cart == null) return BadRequest("Cart not found");

            if (cart.PaymentIntentId == null) return BadRequest("No payment intent for this order");

            var items = new List<OrderItem>();

            foreach (var item in cart.Items)
            {
                var productItem = await unit.Repository<Product>().GetByIdAsync(item.ProductId);

                if (productItem == null) return BadRequest("Problem with the order");

                if (productItem.QuantityInStock < item.Quantity)
                {
                    return BadRequest($"Not enough stock for product {item.ProductName}. Available stock: {productItem.QuantityInStock}");
                }
                // Reduce the stock by the ordered quantity
                productItem.QuantityInStock -= item.Quantity;

                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    PictureUrl = item.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                unit.Repository<Product>().Update(productItem);
            }

            var deliveryMethod = await unit.Repository<DeliveryMethod>().GetByIdAsync(orderDto.DeliveryMethodId);

            if (deliveryMethod == null) return BadRequest("No delivery method selected");


            var order = new Order
            {
                OrderItems = items,
                DeliveryMethod = deliveryMethod,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = items.Sum(x => x.Price * x.Quantity),
                Discount = orderDto.Discount,
                PaymentSummary = orderDto.PaymentSummary,
                PaymentIntentId = cart.PaymentIntentId,
                BuyerEmail = email
            };

            // Check if there is an existing order for the same payment intent
            var spec = new OrderSpecification(cart.PaymentIntentId, true);
            var existingOrder = await unit.Repository<Order>().GetEntityWithSpec(spec);

            if (existingOrder != null)
            {
                // Merge fields to preserve the existing order while updating necessary details
                existingOrder.OrderItems = order.OrderItems;
                existingOrder.DeliveryMethod = order.DeliveryMethod;
                existingOrder.ShippingAddress = order.ShippingAddress;
                existingOrder.Subtotal = order.Subtotal;
                existingOrder.Discount = order.Discount;
                existingOrder.PaymentSummary = order.PaymentSummary;
                existingOrder.BuyerEmail = order.BuyerEmail;

                // Update existing order
                unit.Repository<Order>().Update(existingOrder);
                order = existingOrder; // Set the return value to the updated order
            }
            else
            {
                unit.Repository<Order>().Add(order); // Add new order
            }

            if (await unit.Complete())
            {
                return order;
            }

            return BadRequest("Problem creating order");

        }

        // [HttpGet]
        // public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        // {

        //     var spec = new OrderSpecification(User.GetEmail());
        //     var orders = await unit.Repository<Order>().ListAsync(spec);

        //     var ordersToReturn = orders.Select(o => o.ToDto()).ToList();

        //     return Ok(ordersToReturn);
        // }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser([FromQuery] OrderSpecParams specParams)
        {
            var spec = new OrderSpecification(specParams, User.GetEmail());
            return await CreatePagedResult(unit.Repository<Order>(), spec, specParams.PageIndex, specParams.PageSize, o => o.ToDto());
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            var spec = new OrderSpecification(User.GetEmail(), id);

            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return NotFound();

            return order.ToDto();
        }


        [HttpGet("cancel-order/{id:int}")]
        public async Task<ActionResult<OrderDto>> CancelOrder(int id)
        {
            var spec = new OrderSpecification(User.GetEmail(), id);

            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return BadRequest("No order found.");

            if (order.Status != OrderStatus.PaymentReceived)
                return BadRequest("Payment not received for this order");

            order.Status = OrderStatus.Cancelled;
            unit.Repository<Order>().Update(order);

            if (await unit.Complete())
            {
                return order.ToDto();
            }
            return BadRequest("Problem in return order");
        }

    }
}
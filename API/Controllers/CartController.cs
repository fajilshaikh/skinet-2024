
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController(ICartService cartService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetCartById(string id)
        {
            var cart = await cartService.GetCartAsync(id);

           return Ok(cart ?? new ShoppingCart { Id = id });

        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> UpdateCart(ShoppingCart cart)
        {
            var updatedCart = await cartService.SetCartAsynce(cart);
            Console.WriteLine("mycart");

            if (updatedCart == null) return BadRequest("Problem with cart");

            return updatedCart;
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCart(string id)
        {
            var result = await cartService.DeleteCartAsynce(id);

            if (!result) return BadRequest("Problem deleting cart");

            return Ok();
        }
    }
}

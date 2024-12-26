import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MAT_FORM_FIELD, MatFormField, MatLabel } from '@angular/material/form-field';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatIcon,
    MatDivider,
    MatLabel,
    MatFormField,
    MatInput,
    CurrencyPipe,
    MatButton,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {






  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute)
  private cartService = inject(CartService)
  product?: Product;
  quantityInCart = 0;
  quantity = 1;


  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product;
        this.updateQuantityInCart();
      },
      error: error => console.log(error)
    })
  }
  updateQuantityInCart() {
    this.quantityInCart = this.cartService.cart()?.items
      .find(x => x.productId === this.product?.id)?.quantity || 0
    this.quantity = this.quantityInCart || 1
  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart'
  }

  updateCart() {
    if (!this.product) return;
    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart = itemsToAdd;
      this.cartService.addItemToCart(this.product, itemsToAdd);
    } else {
      const itemToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart = itemToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemToRemove);
    }
  }

}

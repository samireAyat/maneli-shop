import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CartService } from './services/cart.service';
import { CartViewModel } from '../../viewModels/cart.viewModel';
import { CartVariantViewModel } from '../../viewModels/cartVariant.viewModel';
import { CartItemViewModel } from '../../viewModels/CartItem.viewModel';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SHARED_IMPORTS, SimplebarAngularModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService) { }
  ngOnInit() {
    this.getCart()
  }
cartItems : CartViewModel = new CartViewModel()
cartVariant : CartVariantViewModel = new CartVariantViewModel();

get imagePath() {
  return 'http://localhost:3000'
}

  getCart() {
    this.cartService.getCart().subscribe({
      next: response => {
        this.cartItems = response
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  increase() {
    this.cartItems.Items[0].Quantity++;
  }

  decrease() {
    this.cartItems.Items[0].Quantity--;
  }

}

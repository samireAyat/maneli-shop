import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CartService } from './services/cart.service';
import { CartViewModel } from '../../viewModels/cart.viewModel';
import { CartVariantViewModel } from '../../viewModels/cartVariant.viewModel';
import { CartItemViewModel } from '../../viewModels/CartItem.viewModel';
import { AddToCartRequestViewModel } from '../../viewModels/AddToCartRequest.viewModel';
import { PRODUCT_COLORS } from '../../constants/product-colors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SHARED_IMPORTS, SimplebarAngularModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService) { }
  colors = PRODUCT_COLORS;
  ngOnInit() {
    this.getCart()
  }
  cartItems: CartViewModel = new CartViewModel()
  cartVariant: CartVariantViewModel = new CartVariantViewModel();
  cartRequest: AddToCartRequestViewModel = new AddToCartRequestViewModel()

  get imagePath() {
    return 'http://localhost:3000'
  }

  getColorHex(colorName: string): string {
    return this.colors.find(
      color => color.name === colorName
    )?.value ?? '#cccccc';


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

  increase(item: CartItemViewModel) {

    const newQuantity = item.Quantity + 1;

    this.cartService
      .updateCartItem(
        item.ProductID,
        item.VariantID,
        item.SizeID,
        newQuantity
      )
      .subscribe({

        next: res => {

          console.log(res);

          item.Quantity = newQuantity;

        },

        error: error => {

          console.error(error);

        }

      });

  }




  decrease(item: CartItemViewModel) {

    if (item.Quantity <= 1) {
      return;
    }

    const newQuantity = item.Quantity - 1;

    this.cartService
      .updateCartItem(
        item.ProductID,
        item.VariantID,
        item.SizeID,
        newQuantity
      )
      .subscribe({

        next: res => {

          console.log(res);

          item.Quantity = newQuantity;

        },

        error: error => {

          console.error(error);

        }

      });

  }

}

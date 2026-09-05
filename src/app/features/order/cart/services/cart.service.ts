import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { CartViewModel } from '../../../../viewModels/cart.viewModel';
import { CartItemViewModel } from '../../../../viewModels/CartItem.viewModel';
import { AddToCartRequestViewModel } from '../../../../viewModels/AddToCartRequest.viewModel';
import { AuthService } from '../../../../core/services/auth.service';
import { CartProductViewModel } from '../../../../viewModels/cartProduct.viewModel';
import { CartVariantViewModel } from '../../../../viewModels/cartVariant.viewModel';
import { CartSizeViewModel } from '../../../../viewModels/cartSize.viewModel';
import { GuestCartItemViewModel } from '../../../../viewModels/GuestCartItemViewModel ';
import { GuestCartViewModel } from '../../../../viewModels/GuestCartViewModel ';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly CART_KEY = 'guest_cart';

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = 'http://localhost:3000/api/cart';


  getCart(): Observable<CartViewModel> {

    if (this.authService.isLoggedIn()) {
      return this.http.get<CartViewModel>(this.apiUrl);
    }

    const guestCart = this.getGuestCart();

    return this.http.post<CartViewModel>(
      `${this.apiUrl}/guest`,
      guestCart
    );
  }


  postCart(
    product: AddToCartRequestViewModel
  ): Observable<CartViewModel | GuestCartViewModel> {

    if (this.authService.isLoggedIn()) {
      return this.http.post<CartViewModel | GuestCartViewModel>(
        this.apiUrl,
        product
      );
    }

    return this.addToGuestCart(product);
  }


  private addToGuestCart(
    item: AddToCartRequestViewModel
  ): Observable<GuestCartViewModel> {

    const cart = this.getGuestCart();

    const existingItem = cart.Items.find(
      x =>
        x.ProductID === item.ProductID &&
        x.VariantID === item.VariantID &&
        x.SizeID === item.SizeID
    );

    if (existingItem) {

      existingItem.Quantity += item.Quantity;

    } else {

      cart.Items.push({
        ProductID: item.ProductID,
        VariantID: item.VariantID,
        SizeID: item.SizeID,
        Quantity: item.Quantity,
      });

    }

    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(cart)
    );

    return of(cart);
  }


  getGuestCart(): GuestCartViewModel {

    const cart = localStorage.getItem(this.CART_KEY);

    if (!cart) {
      return {
        Items: [],
        UserID: '',

      } as CartViewModel;
    }

    return JSON.parse(cart);
  }


  updateCartItem(
    productID: string,
    variantID: string,
    sizeID: string,
    quantity: number
  ) {

    return this.http.patch(
      `${this.apiUrl}/items`,
      {
        ProductID: productID,
        VariantID: variantID,
        SizeID: sizeID,
        Quantity: quantity
      }
    );
  }


  deleteCartItem(
    ProductID: string,
    VariantID: string,
    SizeID: string
  ) {

    return this.http.delete(
      `${this.apiUrl}/items`,
      {
        body: {
          ProductID,
          VariantID,
          SizeID
        }
      }
    );
  }


  mergeGuestCart(): Observable<CartViewModel> {

    const guestCart = this.getGuestCart();

    if (!guestCart.Items?.length) {
      return of(null as any);
    }

    return this.http.post<CartViewModel>(
      `${this.apiUrl}/merge`,
      guestCart
    );
  }
}
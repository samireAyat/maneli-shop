import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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
  cart = signal<CartViewModel | null>(null);


  cartQuantity = computed(() => {

    const items = this.cart()?.Items ?? [];

    return items.reduce(
      (total, item) => total + item.Quantity,
      0
    );

  });

  constructor() {
    this.loadCart();
  }

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = 'http://localhost:3000/api/cart';


  private loadCart(): void {

    this.getCart().subscribe();

  }


  getCart(): Observable<CartViewModel> {

    if (this.authService.isLoggedIn()) {

      return this.http
        .get<CartViewModel>(this.apiUrl)
        .pipe(
          tap(res => {
            this.cart.set(res);
          })
        );

    }

    const guestCart = this.getGuestCart();

    return this.http
      .post<CartViewModel>(
        `${this.apiUrl}/guest`,
        guestCart
      )
      .pipe(
        tap(res => {
          this.cart.set(res);
        })
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
        Status: '',
        ErorCode: 0
      } as CartViewModel;
    }

    return JSON.parse(cart);
  }



  updateCartItem(
    productId: string,
    variantId: string,
    sizeId: string,
    newQuantity: number
  ) {
    return this.http.patch(
      `${this.apiUrl}/items`,
      {
        ProductID: productId,
        VariantID: variantId,
        SizeID: sizeId,
        Quantity: newQuantity
      }
    ).pipe(

      tap(() => {

        this.cart.update(cart => {

          if (!cart) {
            return cart;
          }

          return {
            ...cart,

            Items: cart.Items.map(item => {

              if (
                item.ProductID === productId &&
                item.VariantID === variantId &&
                item.SizeID === sizeId
              ) {

                return {
                  ...item,
                  Quantity: newQuantity
                };

              }

              return item;

            })

          };

        });

      })

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
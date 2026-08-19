import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartViewModel } from '../../../viewModels/cart.viewModel';
import { Observable } from 'rxjs';
import { CartItemViewModel } from '../../../viewModels/CartItem.viewModel';
import { CartProductViewModel } from '../../../viewModels/cartProduct.viewModel';
import { AddToCartRequestViewModel } from '../../../viewModels/AddToCartRequest.viewModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/cart';

  getCart(): Observable<CartViewModel> {
    return this.http.get<CartViewModel>(this.apiUrl);
  }

  postCard(product: AddToCartRequestViewModel): Observable<CartItemViewModel> {
    return this.http.post<CartItemViewModel>(this.apiUrl, product)
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
}

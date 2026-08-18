import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartViewModel } from '../../../viewModels/cart.viewModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/cart';

  getCart(): Observable<CartViewModel> {
    return this.http.get<CartViewModel>(this.apiUrl);
  }
}

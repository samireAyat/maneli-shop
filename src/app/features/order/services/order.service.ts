import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderRequestViewModel } from '../../../viewModels/careatOrderRequest.viewModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(data: CreateOrderRequestViewModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getMyOrders(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/my-orders`
    );
  }
}

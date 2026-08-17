import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/products';
  getProducts(): Observable<ProductsViewModel[]> {
    return this.http.get<ProductsViewModel[]>(`${this.apiUrl}`)
  }

  getProduct(id: string): Observable<ProductsViewModel> {
    return this.http.get<ProductsViewModel>(`${this.apiUrl}/${id}`)
  }

  createProduct(formData: FormData): Observable<ProductsViewModel> {
    return this.http.post<ProductsViewModel>(
      this.apiUrl,
      formData
    );
  }

  updateProduct(formData: FormData, id: string): Observable<ProductsViewModel> {

    return this.http.put<ProductsViewModel>(
      `${this.apiUrl}/${id}`,
      formData
    );
  }
}

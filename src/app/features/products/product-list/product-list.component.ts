import { Component } from '@angular/core';
import { CartComponent } from "../../cart/cart.component";
import { ProductComponent } from '../product.component';
import { SimplebarAngularModule } from "simplebar-angular";
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { ProductService } from '../services/product.service';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductComponent, SimplebarAngularModule, SHARED_IMPORTS],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  productsList : ProductsViewModel[] = []
  constructor(private productService: ProductService, private router: Router) {
    this.getProducts()
  }

   productImageAddress(images : any) {
    return 'http://localhost:3000' + images
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: res => {
        this.productsList = res

      }
    })
  }

  openProductDetails(id : string) {
    this.router.navigate(['/products',id])
  }

}

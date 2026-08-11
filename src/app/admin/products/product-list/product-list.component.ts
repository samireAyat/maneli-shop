import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../features/products/services/product.service';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink,SHARED_IMPORTS],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
constructor(private productService: ProductService) {}

productList : ProductsViewModel [] = [] ;
ngOnInit() {
  this.getProducts()
}
getProducts() {
  this.productService.getProducts().subscribe({
    next: res => {
      this.productList = res
      console.log(this.productList);
      
    }
  })
}

editProduct(id: string, index: number) {
 const foundedProduct = this.productList?.find(p => p._id === id)!
 this.productList[index] = foundedProduct
}
}

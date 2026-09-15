import { Component } from '@angular/core';
import { ProductService } from '../../../products/services/product.service';
import { FavoriteResponseViewModel, favoriteService } from './favorite.service';
import { ProductsViewModel } from '../../../../viewModels/products.viewModel';
import { ProductComponent } from '../../../products/product.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';

@Component({
  selector: 'app-favorits',
  imports: [ProductComponent, SimplebarAngularModule, SHARED_IMPORTS],
  templateUrl: './favorits.component.html',
  styleUrl: './favorits.component.scss',
})
export class FavoritsComponent {
  constructor(private productService: ProductService, private favoriteService: favoriteService) { }
  productList: ProductsViewModel[] = []
  favoriteList: FavoriteResponseViewModel = {
    message: '',
    Items: [],
    status: '',
    IsFavorite: false
  }

  ngOnInit() {
    this.getFavrite()
  }

  getFavrite() {
    this.favoriteService.getFavorite().subscribe({
      next: res => {
        this.favoriteList.Items = res.Items;
        this.getProduct();

      }
    });
  }

  getProduct() {
    this.productService.getProducts().subscribe({
      next: res => {
        this.productList = res.filter(product =>
          this.favoriteList.Items.some(
            favorite => favorite.ProductID?._id === product._id
          )
        );

        console.log('this.productList', this.productList);

      }
    });
  }

}

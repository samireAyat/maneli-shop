import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { ProductService } from '../services/product.service';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { ProductComponent } from "../product.component";
import { ProductListComponent } from '../product-list/product-list.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CategoriesNavComponent, SHARED_IMPORTS, ProductComponent, ProductListComponent, FilterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  product: ProductsViewModel[] = []
  slug: string = '';
  textPreview = ''

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
      // this.productService.getProducts().subscribe({
      //   next: res => {
      //     if (this.slug === 'all') {
      //       this.product = res
      //     } else if (this.slug === 'shirt') {
      //       this.product = this.product.filter(item => item.Category === 'shirt')
      //     } else {
      //       this.product = this.product.filter(item => item.Category === 'blouse')
      //     }

      //   }
      // })
    });

  }

  selectedCategory = ''


  onSelected(products: ProductsViewModel[]) {
    this.selectedCategory = ''
    this.product = products;
    
    const allSameCategory = products.every(
      product => product.Category === products[0].Category
    )

    if (allSameCategory) {
      this.selectedCategory = products[0].Category
    }

  }

  applyFilter(filteredProductsList: ProductsViewModel[]) {
    this.product = [...filteredProductsList];
  }

  applySort(sortedProductList: ProductsViewModel[]) {
    this.product = [...sortedProductList]
  }


}

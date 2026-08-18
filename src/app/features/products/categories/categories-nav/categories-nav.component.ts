import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';
import { ProductsViewModel } from '../../../../viewModels/products.viewModel';

@Component({
  selector: 'app-categories-nav',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './categories-nav.component.html',
  styleUrl: './categories-nav.component.scss',
})
export class CategoriesNavComponent {
  constructor(private productService: ProductService) { }
  slug = 'all'
  @Output() selectedCatrgory = new EventEmitter<ProductsViewModel[]>()
  product: ProductsViewModel[] = []

  ngOnInit() {
    this.onCategorySelected('all')
  }

  onCategorySelected(category: string) {
    this.slug = category;
    this.productService.getProducts().subscribe({
      next: res => {
        
        if (this.slug === 'all') {
          this.product = res
        } else if (this.slug === 'shirt') {
          this.product = res.filter(item => item.Category === 'shirt')
        } else {
          this.product = res.filter(item => item.Category === 'blouse')
        }

        this.selectedCatrgory.emit(this.product)

      }

    })

  }
}

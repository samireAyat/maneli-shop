import { Component, EventEmitter, Output } from '@angular/core';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { ProductService } from '../../../features/products/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { ProductComponent } from '../../../features/products/product.component';

@Component({
  selector: 'app-search-results',
  imports: [SHARED_IMPORTS, ProductComponent, RouterLink],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  @Output() backClicked = new EventEmitter<boolean>

  query = '';

  searchResults: ProductsViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  back() {
    this.backClicked.emit(true)
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.query = params['q'] || '';

      if (!this.query) {
        this.searchResults = [];
        return;
      }

      this.productService
        .searchProducts(this.query)
        .subscribe({
          next: products => {
            this.searchResults = products;
            console.log(this.searchResults);

          },
          error: err => {
            console.error(err);
            this.searchResults = [];
          }
        });
    });
  }

}

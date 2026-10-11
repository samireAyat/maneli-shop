import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { ProductComponent } from '../product.component';
import { SimplebarAngularModule } from "simplebar-angular";
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { ProductService } from '../services/product.service';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { Router } from '@angular/router';
import { ProductFilterViewModel } from '../../../viewModels/productFilter.viewModel';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductSortViewModel } from '../../../viewModels/productSort.viewModel';
import { FilterComponent } from '../../../shared/components/filter/filter.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductComponent, SimplebarAngularModule, SHARED_IMPORTS, FilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() product = new ProductsViewModel()
  productsList: ProductsViewModel[] = []
 


  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal) {


  }

  ngOnInit() {
    this.getProducts();

  }

  ngAfterViewInit() {

  }

  productsListDeepCopy : ProductsViewModel[] = []

  getProducts() {
    this.productService.getProducts().subscribe({
      next: res => {
        this.productsList = res
        this.productsListDeepCopy = [...this.productsList]

      }
    })
  }

  applyFilter(filteredProductsList: ProductsViewModel[]) {
    debugger
    this.productsList = [...filteredProductsList];
  }


  clearFilters() {
    this.productsList = [...this.productsListDeepCopy]
  }


}

import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ProductFilterViewModel } from '../../../viewModels/productFilter.viewModel';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { ProductSortViewModel } from '../../../viewModels/productSort.viewModel';
import { ProductService } from '../../../features/products/services/product.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared.imports';

@Component({
  selector: 'app-filter',
  imports: [SHARED_IMPORTS],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal) {


  }
  filteredProductsList: ProductsViewModel[] = [];
  @Output() filteredProductsListOutPut = new EventEmitter<ProductsViewModel[]>;
  @Output() sortedProduct = EventEmitter<ProductsViewModel[]>
  @Input() category = '';
  @Input() selectedCategory: string = 'all';
  categories: string[] | string = [];
  colors: string[] = [];
  sizes: string[] = [];

  minPrice = 0;
  maxPrice = 0;

  filter = new ProductFilterViewModel();

  filterModal!: NgbModalRef;

  selectedMinPrice = 0;
  selectedMaxPrice = 0;


  sort = new ProductSortViewModel();
  sortModal!: NgbModalRef;

  @ViewChild('sortTemplate')
  sortTemplate!: TemplateRef<any>;

  @ViewChild('filterTemplate')
  filterTemplate!: TemplateRef<any>;

  @ViewChild('filterWrapper') filterWrapper !: ElementRef<HTMLElement>


  ngOnInit() {
    this.getProducts();
    this.selectedCategory = ''

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory']) {
      this.buildFilterOptions()
      this.filter = new ProductFilterViewModel()
      this.filter.Category = this.selectedCategory
    }
  }


  openSort(): void {
    this.sortModal = this.modalService.open(this.sortTemplate, {
      centered: true,
      size: 'sm',
      windowClass: 'maneli-sort-modal',
      container: this.filterWrapper.nativeElement
    });
  }

  // applySort(): void {
  //   const products = [...this.filteredProductsList];

  //   switch (this.sort.Sort) {

  //     case 'newest':
  //       this.filteredProductsList = products.sort((a, b) => {
  //         return b._id.localeCompare(a._id);
  //       });
  //       break;

  //     case 'price-low':
  //       this.filteredProductsList = products.sort(
  //         (a, b) => a.Price - b.Price
  //       );
  //       break;

  //     case 'price-high':
  //       this.filteredProductsList = products.sort(
  //         (a, b) => b.Price - a.Price
  //       );
  //       break;
  //   }

  //   this.sortModal.close();
  // }

  productsList: ProductsViewModel[] = []

  getProducts() {
    this.productService.getProducts().subscribe({
      next: res => {
        this.productsList = res
        this.filteredProductsList = [...this.productsList];
        if (this.productsList) {
          this.buildFilterOptions()
        }

      }
    })
  }



  applySort(): void {
    this.filteredProductsList = [...this.productsList];
    let products: any
    if (this.selectedCategory) {

      products = [...this.filteredProductsList.filter(m => m.Category === this.selectedCategory)]

    } else {
      products = [...this.filteredProductsList];
    }


    switch (this.sort.Sort) {

      case 'newest':
        this.filteredProductsList = products.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        });
        break;

      case 'price-low':
        this.filteredProductsList = products.sort(
          (a: { Price: number; }, b: { Price: number; }) => a.Price - b.Price
        );
        break;

      case 'price-high':
        this.filteredProductsList = products.sort(
          (a: { Price: number; }, b: { Price: number; }) => b.Price - a.Price
        );
        break;
    }

    this.filteredProductsListOutPut.emit([...this.filteredProductsList])

    this.sortModal.close();
  }


  toggleSize(size: string): void {

    const index = this.filter.Sizes.indexOf(size);

    if (index === -1) {
      this.filter.Sizes.push(size);
    } else {
      this.filter.Sizes.splice(index, 1);
    }

  }

  toggleColor(color: string): void {

    const index = this.filter.Colors.indexOf(color);

    if (index === -1) {
      this.filter.Colors.push(color);
    } else {
      this.filter.Colors.splice(index, 1);
    }

  }



  buildFilterOptions(): void {


    if (this.category) {
      this.categories = this.category
    } else {
      this.categories = [
        ...new Set(
          this.productsList
            .map(product => product.Category)
            .filter(category => category)
        )

      ];
    }

    this.colors = [
      ...new Set(
        this.productsList
          .flatMap(product =>
            product.Variants.map(variant => variant.Color)
          )
          .filter(color => color)
      )
    ];

    this.sizes = [
      ...new Set(
        this.productsList
          .flatMap(product =>
            product.Variants.flatMap(variant =>
              variant.Sizes.map(size => size.Name)
            )
          )
          .filter(size => size)
      )
    ];

    const prices = this.productsList.map(product => product.Price);

    this.minPrice = Math.min(...prices);

    this.maxPrice = Math.max(...prices);
    this.filter.MinPrice = this.minPrice;
    this.filter.MaxPrice = this.maxPrice;
  }


  getColorValue(color: string) {

  }

  removeColorFilter(color: string) {
    this.filter.Colors =
      this.filter.Colors.filter(item => item !== color);


    setTimeout(() => {
      this.applyProductFilters();
    }, 2000)
  }

  removeSizeFilter(size: string) {
    this.filter.Sizes =
      this.filter.Sizes.filter(item => item !== size);

    this.applyProductFilters();
  }

  removeCategoryFilter() {
    this.filter.Category = '';
    this.applyProductFilters();
  }

  hasActiveFilters(): boolean {
    return (
      !!this.filter.Category ||
      this.filter.Colors.length > 0 ||
      this.filter.Sizes.length > 0 ||
      this.filter.InStock
    );
  }

  openFilters(): void {
    this.filterModal = this.modalService.open(this.filterTemplate, {
      centered: true,
      size: 'sm',
      windowClass: 'maneli-filter-modal',
      container: this.filterWrapper.nativeElement
    });

  }

  clearFilters(): void {
    if (this.selectedCategory) {

      this.filter.Category = this.selectedCategory;
      this.filteredProductsList = this.productsList.filter(m => m.Category === this.selectedCategory)
    } else {
      this.filter = new ProductFilterViewModel();
      this.filter.MinPrice = this.minPrice;
      this.filter.MaxPrice = this.maxPrice;

      this.filteredProductsList = [...this.productsList];
      this.filteredProductsListOutPut.emit([...this.filteredProductsList])
    }








    this.applySortWithoutClosingModal();
  }


  applySortWithoutClosingModal(): void {
    switch (this.sort.Sort) {

      case 'newest':
        this.filteredProductsList.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        });
        break;

      case 'price-low':
        this.filteredProductsList.sort(
          (a, b) => a.Price - b.Price
        );
        break;

      case 'price-high':
        this.filteredProductsList.sort(
          (a, b) => b.Price - a.Price
        );
        break;
    }
    this.filteredProductsListOutPut.emit([...this.filteredProductsList])
  }


  applyFilters(): void {

    this.applyProductFilters();

    this.filterModal.close();

  }

  applyProductFilters(): void {
    const category = this.filter.Category;
    const selectedColors = this.filter.Colors;
    const selectedSizes = this.filter.Sizes;
    if (this.selectedCategory) {

    }

    this.filteredProductsList = this.productsList.filter(product => {
      // -------------------------
      // Category
      // -------------------------

      const categoryMatch =
        !category ||
        product.Category === category;


      // -------------------------
      // Price
      // -------------------------

      const priceMatch = this.filter.MinPrice == 0 && this.filter.MaxPrice == 0 ?  true :  product.Price >= this.filter.MinPrice &&
          product.Price <= this.filter.MaxPrice;



      // -------------------------
      // Variant
      // -------------------------

      const variantMatch = product.Variants.some(variant => {

        const colorMatch =
          selectedColors.length === 0 ||
          selectedColors.includes(variant.Color);


        const sizeMatch =
          selectedSizes.length === 0 ||
          variant.Sizes.some(size =>
            selectedSizes.includes(size.Name)
          );


        return colorMatch && sizeMatch;

      });


      // -------------------------
      // Stock
      // -------------------------

      const stockMatch =
        !this.filter.InStock ||
        product.Variants.some(variant =>
          variant.Sizes.some(size => size.Stock > 0)
        );


      return (
        categoryMatch &&
        priceMatch &&
        variantMatch &&
        stockMatch
      );

    });
    this.filteredProductsListOutPut.emit([...this.filteredProductsList])
  }

}

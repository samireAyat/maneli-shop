import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from "../../shared/shared.imports";
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Router, RouterLink } from "@angular/router";
import { FormControl } from '@angular/forms';
import { ProductsViewModel } from '../../viewModels/products.viewModel';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../features/products/services/product.service';

@Component({
  selector: 'app-header',
  imports: [SHARED_IMPORTS, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private productService: ProductService, private router: Router) { }
  charCount = 0
  isSubmenuOpen = false
  isMenuOpen = false

  // constructor(private overlay: Overlay) {

  //  }
  @ViewChild('cartIcon') cartIcon!: ElementRef;
  cartItems: any[] = [];
  totalPrice: number = 0;
  private overlayRef: OverlayRef | null = null;
  private hideTimeout: any;
  searchControl = new FormControl('');
  searchResults: ProductsViewModel[] = [];

  ngOnInit() {

  }


clearInput() {
  this.searchControl.reset();
}

  search() {
    const query = this.searchControl.value?.trim();

    if (!query) {
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: {
        q: query
      }
    });
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const container = document.querySelector('.header-inner');

    // const addListContainer = document.querySelector('.addListForm')
    // const cardEditContainer = document.querySelector('.card-menu')

    // if (this.addListBoxIsOpen && addListContainer && !addListContainer.contains(target)) {
    //   this.addListBoxIsOpen = false
    // }

    // if (cardEditContainer && !cardEditContainer.contains(target)) {
    //   this.cardResult.forEach(list => {
    //     list.forEach((c: any) => {
    //       c.editCardClicked = false;
    //     });
    //   });
    //   this.isLabelMenuOpen = false
    // }

    if (container && !container.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  onCloseMenu() {
    this.isMenuOpen = false;
  }


}

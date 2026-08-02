import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from "../../shared/shared.imports";
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [SHARED_IMPORTS, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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

import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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
  
  // constructor(private overlay: Overlay) {

  //  }
  @ViewChild('cartIcon') cartIcon!: ElementRef;
  cartItems: any[] = [];
  totalPrice: number = 0;
  private overlayRef: OverlayRef | null = null;
  private hideTimeout: any;

  

}

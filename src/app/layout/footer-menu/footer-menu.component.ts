import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-footer-menu',
  imports: [SHARED_IMPORTS],
  templateUrl: './footer-menu.component.html',
  styleUrl: './footer-menu.component.scss',
})
export class FooterMenuComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  charCount = 0
}

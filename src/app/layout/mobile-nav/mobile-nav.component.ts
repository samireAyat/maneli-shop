import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-mobile-nav',
  imports: [SHARED_IMPORTS],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
})
export class MobileNavComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  charCount = 0
}

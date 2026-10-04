import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { CartService } from '../../features/order/cart/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-mobile-nav',
  imports: [SHARED_IMPORTS],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss',
})
export class MobileNavComponent {
  constructor(public cartService: CartService, public authService: AuthService) {}
  cartItems: any[] = [];
  totalPrice: number = 0;
  charCount = 0
  currentUser : any 

  ngOnInit() {
    this.currentUser = this.authService.currentUser()
  }

}

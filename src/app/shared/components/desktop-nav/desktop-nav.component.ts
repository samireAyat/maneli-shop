import { Component, Input, signal } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared.imports';
import { AuthService } from '../../../core/services/auth.service';
import { UserViewModel } from '../../../viewModels/user.viewModel';
import { Router } from '@angular/router';
import { CartService } from '../../../features/order/cart/services/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-desktop-nav',
  imports: [SHARED_IMPORTS],
  templateUrl: './desktop-nav.component.html',
  styleUrl: './desktop-nav.component.scss',
})
export class DesktopNavComponent {
  charCount = 0
  isLoggedIn = false
  userInfo: UserViewModel | null = new UserViewModel()

  constructor(public authService: AuthService, private router: Router, public cartService: CartService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}

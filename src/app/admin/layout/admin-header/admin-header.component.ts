import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-header',
  imports: [SHARED_IMPORTS],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
constructor(public authService: AuthService, private router: Router) {}

logOut() {
  this.authService.logout();
  this.router.navigate(['/login'])
}

}

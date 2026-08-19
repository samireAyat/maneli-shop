import { Component } from '@angular/core';
import { ProductFormComponent } from './../../products/product-form/product-form.component'
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [AdminSidebarComponent, RouterOutlet, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
constructor(private router: Router, public authService: AuthService, private route: ActivatedRoute) {

}






}

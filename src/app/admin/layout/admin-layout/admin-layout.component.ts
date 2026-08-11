import { Component } from '@angular/core';
import { ProductFormComponent } from './../../products/product-form/product-form.component'
import { RouterOutlet } from "@angular/router";
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  imports: [AdminSidebarComponent, RouterOutlet, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {

}

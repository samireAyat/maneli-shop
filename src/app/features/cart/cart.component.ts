import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SHARED_IMPORTS, SimplebarAngularModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}

import { Component } from '@angular/core';
import { CartComponent } from "../../cart/cart.component";
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {

}

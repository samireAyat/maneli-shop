import { Component } from '@angular/core';
import { CartComponent } from "../../cart/cart.component";

@Component({
  selector: 'app-product-list',
  imports: [CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {

}

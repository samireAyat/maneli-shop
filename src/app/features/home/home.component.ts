import { Component } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { ProductListComponent } from "../products/product-list/product-list.component";

@Component({
  selector: 'app-home',
  imports: [CartComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}

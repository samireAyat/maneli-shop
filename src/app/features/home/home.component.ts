import { Component } from '@angular/core';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-home',
  imports: [CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}

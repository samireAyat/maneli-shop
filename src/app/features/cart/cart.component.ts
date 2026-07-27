import { Component, Input } from '@angular/core';
import { SHARED_IMPORTS  } from "../../shared/shared.imports";

@Component({
  selector: 'app-cart',
  imports: [SHARED_IMPORTS],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() id = 0

  openProductDetails(id: number) {
    
  }

}

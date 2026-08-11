import { Component, Input } from '@angular/core';
import { SHARED_IMPORTS } from "../../shared/shared.imports";
import { ProductService } from './services/product.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations'; // <-- import کردن توابع مورد نیاز

@Component({
  selector: 'app-product',
  imports: [SHARED_IMPORTS],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  animations: [
    trigger('hoverMove', [
      state('idle', style({ transform: 'translateY(0px) rotate(0deg)' })),
      state('floating', style({ transform: 'translateY(-20px) rotate(2deg)' })),
      transition('idle <=> floating', [
        animate('0.6s ease-in-out'),
      ]),
    ]),
  ],
})
export class ProductComponent {
  @Input() id = 0


  openProductDetails(id: number) {

  }
}



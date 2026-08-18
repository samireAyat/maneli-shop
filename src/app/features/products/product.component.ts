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
import { ProductsViewModel } from '../../viewModels/products.viewModel';
import { Route, Router } from '@angular/router';

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
  constructor(private router: Router) { }
  @Input() product = new ProductsViewModel()

  productImageAddress(images: any) {
    return 'http://localhost:3000' + images
  }

  openProductDetails(id: string) {
    this.router.navigate(['/products', id])
  }
}



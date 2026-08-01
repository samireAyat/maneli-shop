import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from "../../../shared/shared.imports";

@Component({
  selector: 'app-cart-preview',
  imports: [SHARED_IMPORTS],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.scss',
})
export class CartPreviewComponent {
  @Input() cartItems: any[] = [
        {
      id: 1,
      title: 'شومیز لینن',
      price: 1200000,
      color: 'blue'
    },
    {
      id: 2,
      title: 'تی شرت ',
      price: 800000,
      color: 'white'
    }
  ];
  @Input() totalPrice: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<any>();
  constructor(private router: Router) { }
  get itemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  goToCart() {
    this.close.emit();
    this.router.navigate(['/cart']);
  }

  removeFromCart(item: any) {
    this.removeItem.emit(item);

  }

}

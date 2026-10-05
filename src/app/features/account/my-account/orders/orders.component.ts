import { Component } from '@angular/core';
import { OrderService } from '../../../order/services/order.service';
import { OrderViewModel } from '../../../../viewModels/order.viewModel';
import { log } from 'node:console';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  constructor(private orderService: OrderService) { }

  loading = false;
  orders: OrderViewModel = new OrderViewModel()
  ngOnInit() {
    this.getOrders()
  }
  getOrders(): void {
    this.loading = true;

    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.orders = response.orders || [];
        this.loading = false;
        console.log(this.orders);
        
      },
      error: (error) => {
        console.error('Get orders error:', error);
        this.loading = false;
      }
    });
  }
}

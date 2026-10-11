import { Component } from '@angular/core';
import { OrderService } from '../../../order/services/order.service';
import { OrderViewModel } from '../../../../viewModels/order.viewModel';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { Route, Router, RouterLink } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';



@Component({
  selector: 'app-orders',
  imports: [SHARED_IMPORTS, RouterLink, SimplebarAngularModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  constructor(private orderService: OrderService, private route: Router) { }

  loading = false;
  orders: OrderViewModel[] = []
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

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date));
  }

  openOrderDetail(orderNumber: string) {
    this.route.navigate(['/order-detail' , orderNumber])
  }
}

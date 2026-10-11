import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../../../../order/services/order.service';
import { OrderViewModel } from '../../../../../viewModels/order.viewModel';
import { OrderItemViewModel } from '../../../../../viewModels/orderItem.viewModel';
import { SHARED_IMPORTS } from '../../../../../shared/shared.imports';

@Component({
  selector: 'app-order-detail',
  imports: [SHARED_IMPORTS],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  odrerNumber = ''
  index = 0
  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) {

    this.odrerNumber = this.route.snapshot.params['orderNumber']
  }

  orders: OrderViewModel[] = []
  orderItems: OrderItemViewModel[] | undefined = []
  ngOnInit() {
    this.getOrders()
  }

  getOrders(): void {

    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.orders = response.orders || [];
        this.orderItems = this.orders.find(m => m.OrderNumber === this.odrerNumber)?.Items
        this.index = this.orders.findIndex(m => m.OrderNumber === this.odrerNumber)
        console.log('this.orderItems', this.orderItems);


      },
      error: (error) => {
        console.error('Get orders error:', error);
      }
    });
  }

  getProduct(id: string) {
    this.router.navigate(['/products', id])
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date));
  }
}

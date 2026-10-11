import { Component, Input } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { AddressViewModel } from '../../../viewModels/address.ViewModel';
import { CreateOrderViewModel } from '../../../viewModels/CreateOrder.viewModel';
import { CartService } from '../cart/services/cart.service';
import { CartItemViewModel } from '../../../viewModels/CartItem.viewModel';
import { OrderService } from '../services/order.service';
import { AppSetting } from '../../../core/appSetting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [SHARED_IMPORTS],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  @Input() productTotal = 0;
  @Input() selectedAddress = new AddressViewModel()
  @Input() totalCount = 0
  cartItems: CartItemViewModel[] = []
  setting: AppSetting = new AppSetting()
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.getCart()
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: res => {
        this.cartItems = res.Items

      }
    })
  }

  submit() {
    const orderData = new CreateOrderViewModel();

    orderData.Items = this.cartItems.map(item => ({
      ProductID: item.ProductID,
      ProductName: item.Product.Name,
      Color: item.Variant.Color,
      Size: item.Size.Name,
      Quantity: item.Quantity,
      Price: item.Product.Price,
      Image: item.Variant.Image?.[0] || ''

    }));

    orderData.TotalAmount = this.productTotal;
    orderData.TotalCount = this.totalCount;
    orderData.ShippingAddress = this.selectedAddress;

    this.orderService.createOrder(orderData).subscribe({
      next: response => {
        this.setting.swalStructure.fire({
          title: 'سفارش با موفقیت ثبت شد',
          text: 'از اعتماد شما به مانلی سپاسگزاریم.',
          icon:'success',
          confirmButtonText: 'مشاهده سفارش'
        }).then((result)=>{
          if(result.isConfirmed) {
            this.router.navigate(['/my-account/orders']);
          }
        })

        this.cartService.clearCart().subscribe({
          next: () => {
            console.log('Cart cleared');

          },
          error: error => {
            console.error('Clear cart error:', error);
          }
        })
      },
      error: error => {
        console.error('Create order error:', error);
      }
    });
  }
}

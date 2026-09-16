import { Component } from '@angular/core';
import { CartComponent } from "./cart/cart.component";
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddressViewModel } from '../../viewModels/address.ViewModel';

@Component({
  selector: 'app-order',
  imports: [CartComponent, ShippingComponent, PaymentComponent, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  currentStep = 'cart'
  isShippingCompleted = false;
  isCartCompleted = false
  isPaymentCompleted = false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      const step = param['step'];
      if (
        step === 'cart' || step === 'shipping' || step === 'payment'
      ) {
        this.currentStep = step;
      } else {
        this.currentStep = 'cart';
        this.router.navigate(['/order'],
          {
            queryParams: {
              step: 'cart'
            },
            replaceUrl: true
          }
        )
      }
    })
  }

  goToStep(step: 'cart' | 'shipping' | 'payment') {
    this.router.navigate(['/order'],
      {
        queryParams: {
          step: step
        }
      }
    );

  }



  confirmCart(event: any) {
    if (event) {
      this.isCartCompleted = true
      this.goToStep('shipping')
    }

  }

  productTotal = 0
  selectedAddress : AddressViewModel = new AddressViewModel()

  getProductTotal(event: any) {
    this.productTotal = event
  }

  getAddress(event: any) {
    this.selectedAddress = event
  }

  confirmShipping(event: any) {
    if (event) {
      this.isShippingCompleted = true
      this.goToStep('payment')

    }
  }

  totalCount = 0

  getTotalQuantity(event: any) {
    this.totalCount = event
  }

}

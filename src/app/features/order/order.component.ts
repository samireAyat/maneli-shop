import { Component } from '@angular/core';
import { CartComponent } from "./cart/cart.component";
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
}

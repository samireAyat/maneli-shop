import { Component, Input } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { AddressViewModel } from '../../../viewModels/address.ViewModel';

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
}

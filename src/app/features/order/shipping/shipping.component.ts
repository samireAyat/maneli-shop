import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { provinces } from '../../../shared/components/province-city-selector/iran-locations';
import { AddressViewModel } from '../../../viewModels/address.ViewModel';
import { ShippingService } from './shipping.service';
import Swal from 'sweetalert2';
import { AppSetting } from '../../../core/appSetting';
import { CartComponent } from "../cart/cart.component";
import { CartItemViewModel } from '../../../viewModels/CartItem.viewModel';
import { CartService } from '../cart/services/cart.service';
import { SimplebarAngularModule } from "simplebar-angular";
import { CartVariantViewModel } from '../../../viewModels/cartVariant.viewModel';
import { AddressListComponent } from '../../account/my-account/address-list/address-list.component';



@Component({
  selector: 'app-shipping',
  imports: [SHARED_IMPORTS, CartComponent, SimplebarAngularModule, AddressListComponent],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})


export class ShippingComponent {
  @ViewChild('newAddressTemplate') modalTemplate !: TemplateRef<any>
  @ViewChild('shippingWrapper') shippingWrapper !: ElementRef<HTMLElement>
  @ViewChild('addressList') addressList !: AddressListComponent
  @Output() isConfirmed = new EventEmitter<boolean>
  @Output() selectedAddress = new EventEmitter<string>
  
  appSetting: AppSetting = new AppSetting


  constructor(public modalService: NgbModal, private shippingService: ShippingService, private cartService: CartService) {

  }
  productImages: any[] = []
  defaultAddress: any
  ngOnInit() {
    this.getCart()
  }

  
  onAddressListChange(addresses: AddressViewModel[]) {
    this.defaultAddress = addresses.find((address: { IsDefault: any; }) => address.IsDefault) ?? '';
    this.passSelectedAddress()

  }


  getCart() {
    this.cartService.getCart().subscribe({
      next: res => {
        this.productImages = res.Items

      }
    })
  }

    confirm() {
    this.isConfirmed.emit(true)
  }


passSelectedAddress() {
this.selectedAddress.emit(this.defaultAddress)
}


}

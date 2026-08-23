import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { provinces } from '../../../shared/components/province-city-selector/iran-locations';
import { AddressViewModel } from '../../../viewModels/address.ViewModel';
import { ShippingService } from './shipping.service';

@Component({
  selector: 'app-shipping',
  imports: [SHARED_IMPORTS],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})
export class ShippingComponent {
  @ViewChild('newAddressTemplate') modalTemplate !: TemplateRef<any>
  @ViewChild('shippingWrapper') shippingWrapper !: ElementRef<HTMLElement>

  constructor(private modalService: NgbModal, private shippingService: ShippingService) {

  }

  ngOnInit() {
    this.getAddress()
  }
  provice = provinces
  cities: any[] = []
  selectedProvince: any = null;
  selectedCity: any = null;
  newAddress : AddressViewModel = new AddressViewModel
  addressList: AddressViewModel[] = []
  selectedAddressId: string = ''

  onProvinceChange() {
    this.cities = this.provice.find(city =>
      city.province === this.newAddress.Province
    )?.cities!
    this.selectedCity = null
  }

  onNewAdrressModal(modal: any) {
    this.modalService.open(this.modalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: true,
      keyboard: true,
      windowClass: 'new-address-modal',
      container: this.shippingWrapper.nativeElement

    })
  }
  getAddress() {
    this.shippingService.getAddresses().subscribe({
      next: res => {
        this.addressList = res.Addresses
        
      }
    })
  }


  onSubmitNewAddress() {
    this.shippingService.createAddress(this.newAddress).subscribe({
      next: res => {
        console.log(res);
        
      }
    })
  }
}

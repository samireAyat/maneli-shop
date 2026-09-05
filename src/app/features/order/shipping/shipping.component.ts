import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
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


interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
@Component({
  selector: 'app-shipping',
  imports: [SHARED_IMPORTS, CartComponent, SimplebarAngularModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})


export class ShippingComponent {
  @ViewChild('newAddressTemplate') modalTemplate !: TemplateRef<any>
  @ViewChild('shippingWrapper') shippingWrapper !: ElementRef<HTMLElement>
  appSetting: AppSetting = new AppSetting

  constructor(public modalService: NgbModal, private shippingService: ShippingService, private cartService: CartService) {

  }

  ngOnInit() {
    this.getAddress()
    this.getCart()
  }
  provice = provinces
  cities: any[] = []
  selectedProvince: any = null;
  selectedCity: any = null;
  newAddress: AddressViewModel = new AddressViewModel
  addressList: AddressViewModel[] = []
  selectedAddressId: string = ''

  onProvinceChange() {
    this.cities = this.provice.find(city =>
      city.province === this.newAddress.Province
    )?.cities!
    this.selectedCity = null
  }

  onNewAdrressModal(modal: any) {
    if (!this.addressList) {
      this.addressesListShow = false

    } else {
      this.addressesListShow = true
      this.addingNewAddress = false
    }
    this.newAddress = new AddressViewModel()
    this.modalService.open(this.modalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: true,
      keyboard: true,
      windowClass: 'new-address-modal',
      container: this.shippingWrapper.nativeElement

    })
  }

  get label(): string {
    let label: string = ''
    if (this.isEdittingAddress) {
      label = 'ویرایش آدرس'
    } else if (this.addingNewAddress) {
      label = 'آدرس جدید'
    } else if (this.addressList.length) {
      this.addingNewAddress = false;
      label = ' لیست آدرس‌ها'
    }
    return label
  }
  addressesListShow = false
  getAddress() {
    this.shippingService.getAddresses().subscribe({
      next: res => {
        this.addressList = res.data.Addresses

      }
    })
  }


  onSubmitNewAddress() {

    if (!this.isEdittingAddress) {

      this.shippingService.createAddress(this.newAddress).subscribe({

        next: (res) => {

          if (res.status === 201) {

            this.appSetting.swalToastStructure.fire({
              text: res.message,
              background: 'var(--primary)'
            });

            this.modalService.dismissAll();
          }

        },

        error: (error) => {

          console.log(error);

          this.appSetting.swalToastStructure.fire({
            text: error.error?.message || 'خطایی رخ داده است',
            background: 'var(--secondary)'
          });

        }

      });

    } else {

      this.shippingService
        .updateAddress(this.newAddress._id, this.newAddress)
        .subscribe({

          next: (res) => {

            if (res.status === 200) {

              this.appSetting.swalToastStructure.fire({
                text: res.message,
                background: 'var(--primary)'
              });

              this.modalService.dismissAll();
            }

          },

          error: (error) => {

            console.log(error);

            this.appSetting.swalToastStructure.fire({
              text: error.error?.message || 'خطایی رخ داده است',
              background: 'var(--secondary)'
            });

          }

        });
    }
  }
  isEdittingAddress = false

  editAddress(address: AddressViewModel) {
    this.addressesListShow = false
    this.isEdittingAddress = true
    this.newAddress = address
    this.modalService.open(this.modalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: true,
      keyboard: true,
      windowClass: 'new-address-modal',
      container: this.shippingWrapper.nativeElement

    })

  }
  productImages: any[] = []
  addingNewAddress = false

  getCart() {
    this.cartService.getCart().subscribe({
      next: res => {
        this.productImages = res.Items.map((m) => m.Variant.Images)
      }
    })
  }

  makeAddressDefult(item: AddressViewModel) {
    this.addressList.forEach(m => {
      m.IsDefault = false
    })
    item.IsDefault = true;
    this.shippingService.updateAddress(item._id, item).subscribe({
      next: res => {
        this.appSetting.swalToastStructure.fire({
          text: 'عملیات با موفقیت انجام شد.',
          background: 'var(--primary-300)'
        })
        this.modalService.dismissAll()
      }
    })
  }
}

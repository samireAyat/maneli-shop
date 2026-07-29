import { Component } from '@angular/core';
import { provinces } from '../../shared/components/province-city-selector/iran-locations';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-checkout',
  imports: [SHARED_IMPORTS],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  provice = provinces
  cities: any[] = []
  selectedProvince: any = null;
  selectedCity: any = null;

  ngOnInit() {
    console.log(this.provice);

  }

  onProvinceChange() {
    this.cities = this.provice.find(city =>
      city.province === this.selectedProvince
    )?.cities!
    this.selectedCity = null
  }
}

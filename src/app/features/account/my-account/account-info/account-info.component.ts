import { Component } from '@angular/core';
import { SolarIconComponent } from "../../../../shared/components/solar-icon/solar-icon.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserViewModel } from '../../../../viewModels/user.viewModel';
import { ProfileService } from '../edit-profile/services/profile.service';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';



@Component({
  selector: 'app-account-info',
  imports: [SolarIconComponent, RouterLink, SHARED_IMPORTS, RouterOutlet, AccountDetailComponent, OrdersHistoryComponent],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent {


}

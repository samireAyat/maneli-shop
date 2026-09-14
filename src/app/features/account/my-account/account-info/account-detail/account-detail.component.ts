import { Component } from '@angular/core';
import { UserViewModel } from '../../../../../viewModels/user.viewModel';
import { ProfileService } from '../../edit-profile/services/profile.service';
import { SHARED_IMPORTS } from '../../../../../shared/shared.imports';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  imports: [SHARED_IMPORTS, RouterLink],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss',
})
export class AccountDetailComponent {
  constructor(private profileService: ProfileService) {}
userInfo : UserViewModel = new UserViewModel();

ngOnInit() {
  this.getUserInfo()
}

getUserInfo() {
  this.profileService.getProfile().subscribe({
    next: res => {
      this.userInfo = res.User
    }
  })
}
}

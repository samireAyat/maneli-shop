import { Component } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { UserViewModel } from '../../../../viewModels/user.viewModel';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { NgForm } from '@angular/forms';
import { AppSetting } from '../../../../core/appSetting';


@Component({
  selector: 'app-edit-profile',
  imports: [SHARED_IMPORTS],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  appSetting = new AppSetting;

constructor(
  private profileService : ProfileService
) {}

ngOnInit() {
  this.getUserInfo()
}

userInfo : UserViewModel = new UserViewModel()

getUserInfo() {
  this.profileService.getProfile().subscribe({
    next : res => {
      this.userInfo = res.User
      
    }
  })
}

submit(form : NgForm) {
  if (form.invalid) {
    return
  }
  this.userInfo.Role = 'user'
  this.profileService.updateProfile(this.userInfo).subscribe({
    next: res => {
      if (res.Status === 'success') {
        this.appSetting.swalToastStructure.fire({
          text: res.Message
        })
      }
    }
  })
}
}

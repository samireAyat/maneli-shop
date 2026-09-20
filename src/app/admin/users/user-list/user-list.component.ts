import { Component } from '@angular/core';
import { AdminServices } from '../../admin.services';
import { UserViewModel } from '../../../viewModels/user.viewModel';
import { AppSetting } from '../../../core/appSetting';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';

@Component({
  selector: 'app-user-list',
  imports: [SHARED_IMPORTS],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  appSetting = new AppSetting()
  constructor(private adminService: AdminServices) { }

  ngOnInit() {
    this.getUsers()
  }
  usersResult: UserViewModel[] = []

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: res => {
        if (res.Status === 'success') {
          this.usersResult = res.Data
        } else {
          this.appSetting.swalToastStructure.fire({
            text: res.Message,
            background: 'var(--secondary)'
          })
        }

      }
    })
  }

  editProduct(id: string) {

  }
}

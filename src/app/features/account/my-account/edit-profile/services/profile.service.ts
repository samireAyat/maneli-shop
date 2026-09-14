import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserViewModel } from '../../../../../viewModels/user.viewModel';

interface ProfileResponse {
  Message: string;
  Status: string;
  User: UserViewModel;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/auth';

  // دریافت اطلاعات پروفایل
  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(
      `${this.apiUrl}/profile`
    );
  }

  // ویرایش اطلاعات پروفایل
  updateProfile(
    profile: Partial<UserViewModel>
  ): Observable<ProfileResponse> {

    return this.http.put<ProfileResponse>(
      `${this.apiUrl}/profile`,
      profile
    );
  }
}

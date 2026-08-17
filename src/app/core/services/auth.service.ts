import { Injectable, signal } from '@angular/core';
import { UserViewModel } from '../../viewModels/user.viewModel';
import { Observable, tap } from 'rxjs';
import { loginResponseViewModel } from '../../viewModels/loginResponse.viewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api';

  isLoggedIn = signal(
    !!localStorage.getItem('token')
  );

  currentUser = signal(localStorage.getItem('name'))
  currentUserRole = signal(localStorage.getItem('role'))

  constructor(private http: HttpClient) { }

  login(data: UserViewModel): Observable<loginResponseViewModel> {
    return this.http
      .post<loginResponseViewModel>(
        `${this.baseUrl}/auth/login`,
        data
      )
      .pipe(
        tap(res => {
          console.log('USER:', res.User);
          localStorage.setItem('token', res.Token);
          localStorage.setItem('name' , res.User.Name)
          localStorage.setItem('role' , res.User.Role)
          this.isLoggedIn.set(true);
        })
      );
  }



  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role')
    this.isLoggedIn.set(false);
  }
}
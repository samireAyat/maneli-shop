import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { UserViewModel } from '../../viewModels/user.viewModel';
import { loginResponseViewModel } from '../../viewModels/loginResponse.viewModel';
import { AppSetting } from '../appSetting';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  appSetting = new AppSetting()
  private baseUrl = 'http://localhost:3000/api';

  // وضعیت لاگین کاربر
  isLoggedIn = signal(this.checkToken());

  // نام کاربر
  currentUser = signal<string | null>(
    localStorage.getItem('name')
  );


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }


  // =========================
  // LOGIN
  // =========================

  login(data: UserViewModel): Observable<loginResponseViewModel> {

    return this.http
      .post<loginResponseViewModel>(
        `${this.baseUrl}/auth/login`,
        data
      )
      .pipe(

        tap(res => {

          console.log('USER:', res.User);
          const expiresIn = 120 * 60 * 1000;
          const expiresAt = Date.now() + expiresIn;

          localStorage.setItem(
            'token',
            res.Token
          );
          localStorage.setItem(
            'tokenExpiresAt',
            expiresAt.toString()
          );
          localStorage.setItem(
            'name',
            res.User.Name
          );
          localStorage.setItem(
            'role',
            res.User.Role
          );
          this.isLoggedIn.set(true);
          this.currentUser.set(
            res.User.Name
          );
          setTimeout(() => {
            const currentToken =
              localStorage.getItem('token');

            const currentExpiresAt =
              localStorage.getItem('tokenExpiresAt');
            if (
              currentToken &&
              currentExpiresAt &&
              Date.now() >= Number(currentExpiresAt)
            ) {

              this.logout();

            }

          }, expiresIn);

        })

      );
  }

  getToken(): string | null {
    const token =
      localStorage.getItem('token');
    const expiresAt =
      localStorage.getItem('tokenExpiresAt');

    if (!token) {
      return null;
    }

    if (!expiresAt) {

      this.logout();

      return null;
    }

    if (Date.now() >= Number(expiresAt)) {

      this.logout();

      return null;
    }


    return token;
  }

  private checkToken(): boolean {

    const token =
      localStorage.getItem('token');

    const expiresAt =
      localStorage.getItem('tokenExpiresAt');


    if (!token || !expiresAt) {
      return false;
    }

    if (Date.now() >= Number(expiresAt)) {
      this.router?.navigate(['/login'])
      this.clearStorage();

      return false;
    }


    return true;
  }


  currentUserRole(): string | null {

    return localStorage.getItem('role');

  }

  setCurrentUser(user: any): void {

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );

  }

  logout(): void {

    this.clearStorage();

    this.isLoggedIn.set(false);

    this.currentUser.set(null);

  }

  private clearStorage(): void {
    this.appSetting.swalToastStructure.fire({
      text: 'زمان استفاده شما از برنامه به پایان رسیده است لطفا دوباره وارد شوید :)',
      timer: 5000
    })

    localStorage.removeItem('token');

    localStorage.removeItem('tokenExpiresAt');

    localStorage.removeItem('name');

    localStorage.removeItem('role');

    localStorage.removeItem('currentUser');


  }

}

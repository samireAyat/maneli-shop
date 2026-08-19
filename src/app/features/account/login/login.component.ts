import { Component, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { interval, take } from 'rxjs';
import { UserViewModel } from '../../../viewModels/user.viewModel';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SHARED_IMPORTS],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isOTP = false;
  remainingSeconds = 120;
  canResendCode = false;
  phone = '';
  otpCode = '';
  user: UserViewModel = new UserViewModel()
  @ViewChild('step2') step2: HTMLElement | any;

  ngOnInit() {
    this.setInterval();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
  }
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  setInterval() {
    this.canResendCode = false;
    this.remainingSeconds = 120;
    interval(1000)
      .pipe(take(120))
      .subscribe((count) => {
        this.remainingSeconds = 120 - count - 1;
        if (this.remainingSeconds === 0) {
          this.canResendCode = true;
        }
      });
  }

  get formettedTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')} : ${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  showStep2 = false;

  onStep2() {
    this.showStep2 = true;
  }

  login() {
    debugger
    this.authService.login(this.user).subscribe({
      next: res => {
        if (res.Message === 'success') {
          this.authService.setCurrentUser(res.User);
          if (res.User.Role === 'admin') {
            
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/home'])
          }
        }

      }
    })

  }
}

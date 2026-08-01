import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [SHARED_IMPORTS],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isOTP = true;
  remainingSeconds = 120;
  canResendCode = false;
  phone = '';
  otpCode = '';

  ngOnInit() {
    this.setInterval();
  }

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
}

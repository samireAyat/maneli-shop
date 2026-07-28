import { Component } from '@angular/core';
import { SHARED_IMPORTS } from "../../../shared/shared.imports";
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [SHARED_IMPORTS],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isOTP = false
  remainingSeconds = 10;
  canResendCode = false
  phone = ''
  otpCode = ''

  ngOnInit() {
    this.setInterval()
  }

  setInterval() {
    this.canResendCode = false
    this.remainingSeconds = 10;
    interval(1000)
      .pipe(take(10))
      .subscribe(count => {
        this.remainingSeconds = 10 - count - 1;

        if (this.remainingSeconds === 0) {
          this.canResendCode = true;
        }
      });
  }

  resetInterval() {


  }

}

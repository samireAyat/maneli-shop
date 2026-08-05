import { Component } from '@angular/core';
import { SocialComponent } from "../../../shared/components/social/social.component";
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { LoginComponent } from "../login/login.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-account',
  imports: [SocialComponent, SHARED_IMPORTS, LoginComponent, RouterLink],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent {
loggedIn = true
}

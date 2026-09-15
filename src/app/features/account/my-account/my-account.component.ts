import { Component, Type } from '@angular/core';
import { SocialComponent } from "../../../shared/components/social/social.component";
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { LoginComponent } from "../login/login.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { OrdersComponent } from './orders/orders.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { FavoritsComponent } from './favorits/favorits.component';
import { filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-my-account',
  imports: [SocialComponent, SHARED_IMPORTS, LoginComponent, RouterLink, RouterOutlet],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent {
  loggedIn = false

  slug: string = '';
  textPreview = ''
  componentToLoad!: Type<any>;
  mobileView = false
  isChildRouteActive = false;

  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) {

  }
  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn()

    // وضعیت فعلی
    this.checkChildRoute(this.router.url);

    // navigation های بعدی
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(event => {

        console.log('NavigationEnd:', event);

        this.checkChildRoute(event.urlAfterRedirects);

      });

  }

  private checkChildRoute(url: string): void {

    this.isChildRouteActive =
      url.startsWith('/my-account/orders') ||
      url.startsWith('/my-account/favorites') ||
      url.startsWith('/my-account/address-list') ||
      url.startsWith('/my-account/account-info') ||
      url.startsWith('/my-account/edit-profile');

    if (this.isChildRouteActive) {
      this.slug = url.split('/')[2];
    } else {
      this.slug = 'account-info';
    }
  }






}

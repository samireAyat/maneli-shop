import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { DesktopNavComponent } from '../../shared/components/desktop-nav/desktop-nav.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-shell',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MobileNavComponent,
    NgIf,
    DesktopNavComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  showHeader: boolean = true;
  showDesktopNavv: boolean = true;
  showMobileNav: boolean = true;
  isLoggedIn = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,

  ) {



    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     let current = this.route.firstChild;

    //     let routeData: any = {};

    //     while (current) {

    //       if (current.snapshot.data) {
    //         routeData = {
    //           ...routeData,
    //           ...current.snapshot.data
    //         };
    //       }

    //       current = current.firstChild;
    //     }

    //     // this.showHeader = !routeData['hideHeader'];


    //   });

  }

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  get isMyAccountPage(): boolean {
    return this.router.url === '/my-account'
  }

  ngOnInit() {
  }

  get showFooter(): boolean {
    return !this.router.url.startsWith('/categories');
  }

  showDesktopNav(): boolean {
    if (this.isLoginPage) {
      return false;
    }

    if (this.isMyAccountPage && !this.authService.isLoggedIn()) {
      return false;
    }

    return true;
  }
}

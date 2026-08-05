import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { MobileNavComponent } from "../mobile-nav/mobile-nav.component";
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { DesktopNavComponent } from "../../shared/components/desktop-nav/desktop-nav.component";

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, MobileNavComponent, NgIf, DesktopNavComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  showHeader: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let current = this.route.firstChild;

        while (current?.firstChild) {
          current = current.firstChild;
        }

        this.showHeader = !current?.snapshot.data?.['hideHeader'];
      });

  }

  ngOnInit() {

  }



  get showFooter(): boolean {
    return !this.router.url.startsWith('/categories');
  }


}

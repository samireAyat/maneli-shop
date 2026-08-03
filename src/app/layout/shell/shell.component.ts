import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { FooterMenuComponent } from "../footer-menu/footer-menu.component";

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, FooterMenuComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  constructor(private router : Router){}
  
  get showFooter(): boolean {
    return !this.router.url.startsWith('/categories');
  }
}

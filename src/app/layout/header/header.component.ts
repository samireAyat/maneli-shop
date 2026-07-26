import { Component } from '@angular/core';
import { SolarIconComponent } from "../../shared/components/solar-icon/solar-icon.component";

@Component({
  selector: 'app-header',
  imports: [SolarIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

}

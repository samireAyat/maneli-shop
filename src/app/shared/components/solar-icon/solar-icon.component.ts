import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-solar-icon',
  templateUrl: './solar-icon.component.html',
  styleUrl: './solar-icon.component.scss'
})
export class SolarIconComponent {
  @Input() name: string = '';
  @Input() size?: number = 24;
}


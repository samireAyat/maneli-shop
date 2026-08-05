import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared.imports';

@Component({
  selector: 'app-desktop-nav',
  imports: [SHARED_IMPORTS ],
  templateUrl: './desktop-nav.component.html',
  styleUrl: './desktop-nav.component.scss',
})
export class DesktopNavComponent {
 charCount = 0
}

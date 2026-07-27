import { Component } from '@angular/core';
import { SHARED_IMPORTS  } from "../../shared/shared.imports";

@Component({
  selector: 'app-header',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
charCount = 0
isSubmenuOpen = false
}

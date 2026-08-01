import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories-nav',
  imports: [RouterLink],
  templateUrl: './categories-nav.component.html',
  styleUrl: './categories-nav.component.scss',
})
export class CategoriesNavComponent {
slug = ''
}

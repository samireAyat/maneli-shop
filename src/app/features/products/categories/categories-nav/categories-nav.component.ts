import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';

@Component({
  selector: 'app-categories-nav',
  imports: [RouterLink,SHARED_IMPORTS],
  templateUrl: './categories-nav.component.html',
  styleUrl: './categories-nav.component.scss',
})
export class CategoriesNavComponent {
slug = ''
}

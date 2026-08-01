import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CategoriesNavComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {

}

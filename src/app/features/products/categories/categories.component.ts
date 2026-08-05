import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CategoriesNavComponent } from "./categories-nav/categories-nav.component";
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { CategoryPageComponent } from "./category-page/category-page.component";

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CategoriesNavComponent, SHARED_IMPORTS, CategoryPageComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(private route : ActivatedRoute) {}
  slug: string = 'all';
  textPreview = ''

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
      if (this.slug === 'all') {
        this.textPreview = 'this is all products'

      } else if (this.slug === 'blouse') {
        this.textPreview = 'this is blouses products'
      }
      else if (this.slug === 'shirt') {
        this.textPreview = 'this is shirts products'
      }
    });

  }
}

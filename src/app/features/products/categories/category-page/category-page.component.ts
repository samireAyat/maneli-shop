import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesNavComponent } from "../categories-nav/categories-nav.component";
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';

@Component({
  selector: 'app-category-page',
  imports: [CategoriesNavComponent, SHARED_IMPORTS],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss',
})
export class CategoryPageComponent {
  constructor(private route: ActivatedRoute) { }
  slug: string = '';
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

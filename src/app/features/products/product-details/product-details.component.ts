import { Component } from '@angular/core';
import { SHARED_IMPORTS } from "../../../shared/shared.imports";

@Component({
  selector: 'app-product-details',
  imports: [SHARED_IMPORTS],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {



  images = [
    {
      id: 1,
      path: 'images/IMG_1499-copy-removebg-preview.png',
      isSelected: true
    },
    {
      id: 2,
      path: 'images/IMG_1546-copy-510x631-removebg-preview.png',
      isSelected: false
    },
    {
      id: 3,
      path: 'images/IMG_1580-copy-510x632-removebg-preview.png',
      isSelected: false
    },
    {
      id: 4,
      path: 'images/IMG_1585-copy-510x631-removebg-preview.png',
      isSelected: false

    },
    {
      id: 6,
      path: 'images/IMG_1604-copy-510x765-removebg-preview.png',
      isSelected: false
    }

  ]

  heroImage = {
    id: 0,
    path: 'images/IMG_1499-copy-removebg-preview.png',
    isSelected: false
  }

  selectedPhoto(image: any) {
    this.heroImage.id = image.id;
    this.heroImage.path = image.path;
    this.images.forEach(img => {
      img.isSelected = false
    })
    image.isSelected = true
  }

}

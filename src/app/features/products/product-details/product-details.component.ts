import { Component } from '@angular/core';
import { SHARED_IMPORTS } from "../../../shared/shared.imports";
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { ProductVariantViewModel } from '../../../viewModels/ProductVariant.viewModel';
import { ProductSizeViewModel } from '../../../viewModels/productSize.viewModel';
import path from 'path';
import { CartService } from '../../cart/services/cart.service';
import { CartViewModel } from '../../../viewModels/cart.viewModel';
import { CartItemViewModel } from '../../../viewModels/CartItem.viewModel';
import { CartProductViewModel } from '../../../viewModels/cartProduct.viewModel';
import { CartSizeViewModel } from '../../../viewModels/cartSize.viewModel';
import { AddToCartRequestViewModel } from '../../../viewModels/AddToCartRequest.viewModel';


@Component({
  selector: 'app-product-details',
  imports: [SHARED_IMPORTS, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {

  id = '';
  product: ProductsViewModel = new ProductsViewModel()
  constructor(private authService: AuthService, private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
    this.id = this.route.snapshot.params['id']


  }

  ngOnInit() {

    this.getProduct()




  }

  // images = [
  //   {
  //     id: 1,
  //     path: 'images/IMG_1499-copy-removebg-preview.png',
  //     isSelected: true
  //   },
  //   {
  //     id: 2,
  //     path: 'images/IMG_1546-copy-510x631-removebg-preview.png',
  //     isSelected: false
  //   },
  //   {
  //     id: 3,
  //     path: 'images/IMG_1580-copy-510x632-removebg-preview.png',
  //     isSelected: false
  //   },
  //   {
  //     id: 4,
  //     path: 'images/IMG_1585-copy-510x631-removebg-preview.png',
  //     isSelected: false

  //   },
  //   {
  //     id: 6,
  //     path: 'images/IMG_1604-copy-510x765-removebg-preview.png',
  //     isSelected: false
  //   }

  // ]

  selectedVariant: ProductVariantViewModel | null = null;

  selectedSize: ProductSizeViewModel | null = null;


  getProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {

        this.product = product;

        if (this.product.Variants.length > 0) {
          console.log('productVariant', this.product.Variants);

          this.selectedVariant = this.product.Variants[0];

          this.variantsImages = [
            {
              id: this.selectedVariant?._id ?? -1,
              images: (this.selectedVariant?.Images ?? []).map(
                (item, index) => ({
                  id: index,
                  isSelected: false,
                  path: item
                })
              )
            }
          ];
          this.selectedImage = this.selectedVariant.Images?.[0] ?? '';
          // this.product.Variants.forEach((image, index) => {
          //   debugger
          //   this.heroImage[index] = image.Images[0]
          // })
        }

      }
    });
  }



  get ImagePath() {
    return 'http://localhost:3000'
  }

  get heroImage(): string {
    return this.selectedImage ? this.ImagePath + this.selectedImage : ''
  }
  selectedImage = ''
  // heroImage = ''


  selectedColor = ''

  selectVariant(variant: ProductVariantViewModel): void {
    // this.heroImage = this.ImagePath + variant.Images[0]
    this.selectedImage = variant.Images?.[0] ?? '';
    this.selectedVariant = variant;
    this.variantsImages = [
      {
        id: '0',
        images: (variant?.Images ?? []).map(
          (item, index) => ({
            id: index,
            isSelected: false,
            path: item
          })
        )
      }
    ];

    this.selectedColor = variant.Color

    // با تغییر رنگ، سایز انتخاب‌شده قبلی را پاک می‌کنیم
    this.selectedSize = null;
  }



  variantsImages: {
    id: string;
    images: {
      id: number;
      isSelected: boolean;
      path: string;
    }[];
  }[] = [
      {
        id: '',
        images: [
          {
            id: -1,
            isSelected: false,
            path: ''
          }
        ]
      }
    ];

  selectedPhoto(
    image: string,
    index: number,
    variant: ProductVariantViewModel
  ): void {

    this.selectedImage = image;

    this.variantsImages.forEach(v => {
      v.images.forEach(img => {
        img.isSelected = false;
      });
    });

    const selected = this.variantsImages
      .find(v => v.id === variant._id)
      ?.images[index];

    if (selected) {
      selected.isSelected = true;
    }
  }


  // onSelectedSize(size: any) {
  //   this.cartItem.Size = size.Name;
  //   this.cartItem.SizeID = size._id
  // }

  // onSelectColor(color: any) {

  // }
  quantity = 1

  addToCart() {
    debugger
    if (!this.selectedVariant) {
      return
    }
    if (!this.selectedSize) {
      return
    }
    const request: AddToCartRequestViewModel = {
      ProductID: this.product._id,
      VariantID: this.selectedVariant._id,
      SizeID: this.selectedSize._id,
      Quantity: this.quantity,
    }
    this.cartService.postCard(request).subscribe({
      next: res => {
        console.log(res);
        
      }
    })
  }

  // addToCart(product: ProductsViewModel) {
  //   debugger
  //   this.cartService.postCard(this.cartItem).subscribe({
  //     next: res => {

  //     }
  //   })
  // }
}

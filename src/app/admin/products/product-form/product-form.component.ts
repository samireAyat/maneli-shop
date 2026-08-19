import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { ProductService } from '../../../features/products/services/product.service';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { ProductVariantViewModel } from '../../../viewModels/ProductVariant.viewModel'
import { ProductSizeViewModel } from '../../../viewModels/productSize.viewModel'
import { PRODUCT_COLORS } from '../../../constants/product-colors';


@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule,
    SHARED_IMPORTS,
    RouterLink
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // -------------------------
  // Product
  // -------------------------

  product: ProductsViewModel = new ProductsViewModel();

  categories: {
    FaTitle:string,
    EnTitle: string
  } [] = [
    {
      FaTitle: 'شومیز',
      EnTitle: 'blouse'
    },
    {
      FaTitle: 'تی‌شرت',
      EnTitle: 'shirt'
    }
  ]
  

  colors= PRODUCT_COLORS;

  

  sizes: string[] = [
    'XS',
    'S',
    'M',
    'L',
    'Xl'
  ]



  // -------------------------
  // Edit
  // -------------------------

  id: string | null = null;

  isEditing = false;
  variantExistingImages: string[][] = [];
  variantSelectedFiles: File[][] = [];
  variantImagePreviews: string[][] = [];

  // -------------------------
  // State
  // -------------------------

  isSubmitting = false;


  // =========================
  // Lifecycle
  // =========================

  ngOnInit(): void {
    

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {

      this.isEditing = true;

      this.getProduct(this.id);

    }

    if (!this.id) {
      this.product.Variants.push(
        new ProductVariantViewModel()
      );
      this.product.Variants[0].Sizes.push(
        new ProductSizeViewModel()
      )
      this.variantExistingImages.push([])
      this.variantSelectedFiles.push([])
      this.variantImagePreviews.push([])
    }
  }


  // =========================
  // Get Product
  // =========================

  addVariant(): void {

    const variant = new ProductVariantViewModel();


    variant._id = crypto.randomUUID();

    this.product.Variants.push(variant);

    this.variantExistingImages.push([]);

    this.variantSelectedFiles.push([]);

    this.variantImagePreviews?.push([]);




  }

  removeVariant(index: number): void {

    this.product.Variants.splice(index, 1);

    this.variantExistingImages.splice(index, 1);

    this.variantSelectedFiles.splice(index, 1);

    this.variantImagePreviews?.splice(index, 1);

  }

  // getProduct(id: string): void {
  //   this.productService.getProduct(id).subscribe({

  //     next: product => {

  //       this.product = product;

  //       // عکس‌های قبلی
  //       this.existingImages = [
  //         ...(product.Images ?? [])
  //       ];

  //     },

  //     error: err => {

  //       console.error(
  //         'Error loading product:',
  //         err
  //       );

  //     }

  //   });

  // }
  getProduct(id: string): void {

    this.productService.getProduct(id).subscribe({

      next: product => {

        this.product = product;

        this.variantExistingImages =
          this.product.Variants.map(
            variant => [...(variant.Images ?? [])]
          );

        this.variantSelectedFiles =
          this.product.Variants.map(() => []);

        this.variantImagePreviews =
          this.product.Variants.map(() => []);

      },

      error: err => {

        console.error(
          'Error loading product:',
          err
        );

      }

    });

  }

  addSize(variantIndex: number): void {

    const size = new ProductSizeViewModel();

    size._id = crypto.randomUUID();

    this.product.Variants[variantIndex].Sizes.push(size);

  }

  removeSize(
    variantIndex: number,
    sizeIndex: number
  ): void {

    this.product
      .Variants[variantIndex]
      .Sizes
      .splice(sizeIndex, 1);

  }

  // =========================
  // Existing Images
  // =========================

  // removeExistingImage(index: number): void {
  //   
  //   this.existingImages.splice(index, 1);

  // }


  // =========================
  // New Images
  // =========================

  // onFilesSelected(event: Event): void {

  //   const input =
  //     event.target as HTMLInputElement;

  //   if (!input.files?.length) {
  //     return;
  //   }

  //   const files = Array.from(input.files);

  //   const totalImages =
  //     this.existingImages.length +
  //     this.selectedFiles.length;

  //   const remainingSlots =
  //     10 - totalImages;

  //   if (remainingSlots <= 0) {
  //     alert('حداکثر ۱۰ تصویر می‌توانید انتخاب کنید.');
  //     return;
  //   }

  //   files
  //     .slice(0, remainingSlots)
  //     .forEach(file => {

  //       // فقط تصویر
  //       if (!file.type.startsWith('image/')) {
  //         return;
  //       }

  //       // حداکثر 5MB
  //       if (file.size > 5 * 1024 * 1024) {

  //         alert(
  //           `حجم ${file.name} بیشتر از 5MB است.`
  //         );

  //         return;
  //       }

  //       this.selectedFiles.push(file);

  //       const reader = new FileReader();

  //       reader.onload = () => {

  //         if (typeof reader.result === 'string') {

  //           this.imagePreviews.push(
  //             reader.result
  //           );

  //         }

  //       };

  //       reader.readAsDataURL(file);

  //     });

  //   // اجازه انتخاب دوباره همان فایل
  //   input.value = '';

  // }

  onVariantFilesSelected(
    event: Event,
    variantIndex: number
  ): void {
    
    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const files = Array.from(input.files);

    const existingCount =
      this.variantExistingImages[variantIndex]?.length;

    const selectedCount =
      this.variantSelectedFiles[variantIndex].length;

    const remainingSlots =
      10 - existingCount - selectedCount;

    if (remainingSlots <= 0) {

      alert(
        'برای هر رنگ حداکثر ۱۰ تصویر می‌توانید انتخاب کنید.'
      );

      return;
    }

    files
      .slice(0, remainingSlots)
      .forEach(file => {

        if (!file.type.startsWith('image/')) {
          return;
        }

        if (file.size > 5 * 1024 * 1024) {

          alert(
            `حجم ${file.name} بیشتر از 5MB است.`
          );

          return;
        }

        this.variantSelectedFiles[
          variantIndex
        ].push(file);

        const reader = new FileReader();

        reader.onload = () => {

          if (typeof reader.result === 'string') {

            this.variantImagePreviews[variantIndex].push(reader.result);

          }

        };

        reader.readAsDataURL(file);

      });

    input.value = '';

  }

  // removeImage(index: number): void {

  //   this.selectedFiles.splice(index, 1);

  //   this.imagePreviews.splice(index, 1);

  // }


  // =========================
  // Submit
  // =========================

  removeVariantImage(
    variantIndex: number,
    imageIndex: number
  ): void {

    this.variantSelectedFiles[
      variantIndex
    ].splice(imageIndex, 1);

    this.variantImagePreviews[
      variantIndex
    ].splice(imageIndex, 1);

  }

  removeExistingVariantImage(
    variantIndex: number,
    imageIndex: number
  ): void {

    this.variantExistingImages[
      variantIndex
    ].splice(imageIndex, 1);

  }
  createProduct(form: any): void {
    
    if (form.invalid) {

      form.control.markAllAsTouched();

      return;
    }

    this.isSubmitting = true;
    this.product.Price = +this.product.Price

    const formData = new FormData();

    // -------------------------
    // Product data
    // -------------------------
    formData.append(
      'Name',
      this.product.Name
    )
    formData.append(
      'Price',
      String(
        this.product.Price
      )
    )

    formData.append(
      'Category',
        this.product.Category
    )
    formData.append(
      'Description',
      this.product.Description
    )

formData.append(
  'Variants',
  JSON.stringify(
    this.product.Variants.map((variant, variantIndex) => ({
      ID: variant._id,
      Color: variant.Color,

      Images: this.variantExistingImages[variantIndex] ?? [],

      Sizes: variant.Sizes.map(size => ({
        ID: size._id,
        Name: size.Name,
        Stock: size.Stock
      }))
    }))
  )
);


    // -------------------------
    // Existing images
    // -------------------------

    // if (this.isEditing) {

    //   formData.append(
    //     'existingVariantImages',
    //     JSON.stringify(
    //       this.variantExistingImages
    //     )
    //   );

    // }


    // -------------------------
    // New images
    // -------------------------

    this.variantSelectedFiles.forEach(
      (files, variantIndex) => {
        files.forEach(file => {
          formData.append(
            `variantImages_${variantIndex}`,
            file
          );

        });

      }
    );


    // =========================
    // Update
    // =========================

    if (this.id) {


      this.productService
        .updateProduct(
          formData,
          this.id
        )
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe({

          next: res => {

            console.log(
              'Product updated:',
              res
            );

            this.router.navigate(
              ['/admin/products']
            );

          },

          error: err => {

            console.error(
              'Update product error:',
              err
            );

          }

        });

    }

    // =========================
    // Create
    // =========================

    else {
      console.log('========== FORM DATA ==========');

      formData.forEach((value, key) => {
        console.log(key, value);
      });


      this.productService
        .createProduct(formData)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe({

          next: res => {

            console.log(
              'Product created:',
              res
            );

            this.router.navigate(
              ['/admin/products']
            );

          },

          error: err => {

            console.error(
              'Create product error:',
              err
            );

          }

        });

    }

  }


  // =========================
  // Cancel
  // =========================

  cancel(): void {

    this.router.navigate(
      ['/admin/products']
    );

  }

}
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { ProductsViewModel } from '../../../viewModels/products.viewModel';
import { ProductService } from '../../../features/products/services/product.service';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { log } from 'console';

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

  categories: string[] = [
    'شومیز',
    'تی شرت'
  ];

  // -------------------------
  // Edit
  // -------------------------

  id: string | null = null;

  isEditing = false;

  // عکس‌هایی که قبلاً در دیتابیس هستند
  existingImages: string[] = [];

  // عکس‌های جدیدی که کاربر انتخاب کرده
  selectedFiles: File[] = [];

  // Preview عکس‌های جدید
  imagePreviews: string[] = [];

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

  }


  // =========================
  // Get Product
  // =========================

  getProduct(id: string): void {
    this.productService.getProduct(id).subscribe({

      next: product => {

        this.product = product;

        // عکس‌های قبلی
        this.existingImages = [
          ...(product.Images ?? [])
        ];

      },

      error: err => {

        console.error(
          'Error loading product:',
          err
        );

      }

    });

  }


  // =========================
  // Existing Images
  // =========================

  removeExistingImage(index: number): void {
    debugger
    this.existingImages.splice(index, 1);

  }


  // =========================
  // New Images
  // =========================

  onFilesSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const files = Array.from(input.files);

    const totalImages =
      this.existingImages.length +
      this.selectedFiles.length;

    const remainingSlots =
      10 - totalImages;

    if (remainingSlots <= 0) {
      alert('حداکثر ۱۰ تصویر می‌توانید انتخاب کنید.');
      return;
    }

    files
      .slice(0, remainingSlots)
      .forEach(file => {

        // فقط تصویر
        if (!file.type.startsWith('image/')) {
          return;
        }

        // حداکثر 5MB
        if (file.size > 5 * 1024 * 1024) {

          alert(
            `حجم ${file.name} بیشتر از 5MB است.`
          );

          return;
        }

        this.selectedFiles.push(file);

        const reader = new FileReader();

        reader.onload = () => {

          if (typeof reader.result === 'string') {

            this.imagePreviews.push(
              reader.result
            );

          }

        };

        reader.readAsDataURL(file);

      });

    // اجازه انتخاب دوباره همان فایل
    input.value = '';

  }


  removeImage(index: number): void {

    this.selectedFiles.splice(index, 1);

    this.imagePreviews.splice(index, 1);

  }


  // =========================
  // Submit
  // =========================

  createProduct(form: any): void {
    debugger
    if (form.invalid) {

      form.control.markAllAsTouched();

      return;
    }

    this.isSubmitting = true;


    const formData = new FormData();

    // -------------------------
    // Product data
    // -------------------------

    formData.append(
      'Name',
      this.product.Name
    );

    formData.append(
      'Price',
      String(this.product.Price ?? 0)
    );

    formData.append(
      'Description',
      this.product.Description ?? ''
    );

    formData.append(
      'Category',
      this.product.Category ?? ''
    );

    formData.append(
      'Stock',
      String(this.product.Stock ?? 0)
    );

    formData.append(
      'Sizes',
      JSON.stringify(
        this.product.Sizes ?? []
      )
    );

    formData.append(
      'Colors',
      JSON.stringify(
        this.product.Colors ?? []
      )
    );


    // -------------------------
    // Existing images
    // -------------------------

    if (this.isEditing) {

      formData.append(
        'existingImages',
        JSON.stringify(
          this.existingImages
        )
      );

    }


    // -------------------------
    // New images
    // -------------------------

    this.selectedFiles.forEach(file => {

      formData.append(
        'images',
        file
      );

    });


    // =========================
    // Update
    // =========================

    if (this.id) {
      console.log('FORM DATA CONTENT:');

      formData.forEach((value, key) => {
        console.log(key, value);
      });

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
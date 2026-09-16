import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CartService } from './services/cart.service';
import { CartViewModel } from '../../../viewModels/cart.viewModel';
import { CartVariantViewModel } from '../../../viewModels/cartVariant.viewModel';
import { CartItemViewModel } from '../../../viewModels/CartItem.viewModel';
import { AddToCartRequestViewModel } from '../../../viewModels/AddToCartRequest.viewModel';
import { PRODUCT_COLORS } from '../../../constants/product-colors';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SHARED_IMPORTS, SimplebarAngularModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService, private authService: AuthService) { }
  colors = PRODUCT_COLORS;
  Math = Math;
  @Output() isConfirmed = new EventEmitter<boolean>
  @Output() productTotal = new EventEmitter<number>
  @Output() totalQuantity = new EventEmitter<number>


  ngOnInit() {
    this.getCart()

  }
  cartItems: CartViewModel = new CartViewModel()
  cartVariant: CartVariantViewModel = new CartVariantViewModel();
  cartRequest: AddToCartRequestViewModel = new AddToCartRequestViewModel()

  get imagePath() {
    return 'http://localhost:3000'
  }

  getColorHex(colorName: string): string {
    return this.colors.find(
      color => color.name === colorName
    )?.value ?? '#cccccc';


  }
  allProductTotal = signal(0)
  itemProductTotal = signal([0])
  totalCount = signal(0)

  getCart() {
    this.cartService.getCart().subscribe({
      next: response => {
        this.cartItems = response

        let sum = 0
        const eachProductTotal = this.cartItems.Items.map(product => product.Product.Price * product.Quantity);
        this.itemProductTotal.set(eachProductTotal)
        let count = 0
        this.cartItems.Items.forEach(product => {
          count += product.Quantity
        })
        this.totalCount.set(count)
        this.passTotalQuantity()
        console.log('itemProductTotal', this.itemProductTotal());
        this.itemProductTotal().forEach(n => {
          sum += n
        })
        this.allProductTotal.set(sum)
        this.passProductTotal();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  increase(item: CartItemViewModel, index: number) {
    const newQuantity = item.Quantity + 1;

    this.cartService
      .updateCartItem(
        item.ProductID,
        item.VariantID,
        item.SizeID,
        newQuantity
      )
      .subscribe({

        next: () => {

          item.Quantity = newQuantity;

          const newTotal =
            item.Product.Price * item.Quantity;

          this.itemProductTotal.update(totals => {

            const newTotals = [...totals];

            newTotals[index] = newTotal;
            this.passTotalQuantity()
            return newTotals;

          });

          let sum = 0;

          this.itemProductTotal().forEach(
            (n: number) => {
              sum += n;
            }
          );

          this.allProductTotal.set(sum);
          this.passProductTotal();

        },

        error: error => {
          console.error(error);
        }

      });
  }




  decrease(item: CartItemViewModel, index: number) {
    if (item.Quantity <= 1) {
      console.log({
        ProductID: item.ProductID,
        VariantID: item.VariantID,
        SizeID: item.SizeID
      });
      this.cartService.deleteCartItem(item.ProductID, item.VariantID, item.SizeID).subscribe({
        next: res => {
          this.totalCount.update(counts => counts - 1);
          this.itemProductTotal.update(totals => {
            const newTotals = [...totals];
            newTotals.splice(index, 1);
            return newTotals;
          });
          this.allProductTotal.update(() =>
            this.itemProductTotal().reduce(
              (sum, total) => sum + total,
              0
            )
          );
          this.getCart()
          this.cartService.cartQuantity()
          this.passTotalQuantity()
        }
      })
      return;
    }

    const newQuantity = item.Quantity - 1;

    this.cartService
      .updateCartItem(
        item.ProductID,
        item.VariantID,
        item.SizeID,
        newQuantity
      )
      .subscribe({
        next: res => {
          this.totalCount.update(counts => counts - 1)
          item.Quantity = newQuantity;
          const newTotal = item.Product.Price * item.Quantity;
          this.itemProductTotal.update(totals => {
            const newTotals = [...totals];
            newTotals[index] = newTotal;
            return newTotals
          })
          let minus = 0

          this.itemProductTotal().forEach((n: number) => {
            minus -= n
          })

          this.allProductTotal.update(m => (+minus))
        },
        error: error => {
          console.error(error);
        }

      });

  }

  confirm() {
    this.isConfirmed.emit(true)
    this.passProductTotal()

  }

  passProductTotal() {
    this.productTotal.emit(this.allProductTotal())
  }

  passTotalQuantity() {
    this.totalQuantity.emit(this.totalCount())
  }

}

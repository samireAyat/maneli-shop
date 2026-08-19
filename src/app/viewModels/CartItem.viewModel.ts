import { CartProductViewModel } from "./cartProduct.viewModel";
import { CartSizeViewModel } from "./cartSize.viewModel";
import { CartVariantViewModel } from "./cartVariant.viewModel";


export class CartItemViewModel {
    _id: string = ''
    ProductID: string = '';
    VariantID: string = '';
    SizeID: string = '';
    Quantity: number = 0;

    Product!: CartProductViewModel;
    Variant!: CartVariantViewModel;
    Size!: CartSizeViewModel;
}
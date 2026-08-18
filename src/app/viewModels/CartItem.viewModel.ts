import { CartProductViewModel } from "./cartProduct.viewModel";
import { CartSizeViewModel } from "./cartSize.viewModel";
import { CartVariantViewModel } from "./cartVariant.viewModel";


export class CartItemViewModel {
    ProductID: string;
    VariantID: string;
    SizeID: string;
    Quantity: number;
    Product: CartProductViewModel | undefined;
    Variant: CartVariantViewModel | undefined;
    Size: CartSizeViewModel | undefined;
    constructor(
        productID?: string,
        variantID?: string,
        sizeID?: string,
        quantity?: number,
        product?: CartProductViewModel,
        variant?: CartVariantViewModel,
        size?: CartSizeViewModel,
    ) {
        this.ProductID = productID || '';
        this.VariantID = variantID || '';
        this.SizeID = sizeID || '';
        this.Quantity = quantity || 0;
        this.Product = product;
        this.Variant = variant;
        this.Size = size;


    }
}
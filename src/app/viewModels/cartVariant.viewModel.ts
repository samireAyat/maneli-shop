import { CartSizeViewModel } from "./cartSize.viewModel";

export class CartVariantViewModel {
    Color: string;
    Image: string[];
    Sizes: CartSizeViewModel[];
    _id: string;
    constructor(
        color?: string,
        image?: string[],
        sizes?: CartSizeViewModel[],
        _id?: string,
    ) {

        this.Color = color || '';
        this.Image = image || [];
        this.Sizes = sizes || []
        this._id = _id || ''
    }
}
import { CartSizeViewModel } from "./cartSize.viewModel";

export class CartVariantViewModel {
    Color: string;
    Images: string[];
    Sizes: CartSizeViewModel[];
    _id: string;
    constructor(
        color?: string,
        images?: string[],
        sizes?: CartSizeViewModel[],
        _id?: string,
    ) {

        this.Color = color || '';
        this.Images = images || [];
        this.Sizes = sizes || []
        this._id = _id || ''
    }
}
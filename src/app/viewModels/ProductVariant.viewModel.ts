import { ProductSizeViewModel } from "./productSize.viewModel";

export class ProductVariantViewModel {
    _id: string;
    Color: string;
    Images: string[];
    Sizes: ProductSizeViewModel[];
    IsSelected : boolean
;
    constructor(
        _id?: string,
        Color?: string,
        Images?: string[],
        Sizes?: ProductSizeViewModel[],
        isSelected?: boolean,
    ) {
        this._id = _id || '';
        this.Color = Color || '';
        this.Images = Images || [];
        this.Sizes = Sizes || [];
        this.IsSelected = isSelected || false
    }
}
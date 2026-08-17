import { ProductSizeViewModel } from "./productSize.viewModel";

export class ProductVariantViewModel {
    ID: string;
    Color: string;
    Images: string[];
    Sizes: ProductSizeViewModel[];
    IsSelected : boolean
;
    constructor(
        ID?: string,
        Color?: string,
        Images?: string[],
        Sizes?: ProductSizeViewModel[],
        isSelected?: boolean,
    ) {
        this.ID = ID || '';
        this.Color = Color || '';
        this.Images = Images || [];
        this.Sizes = Sizes || [];
        this.IsSelected = isSelected || false
    }
}
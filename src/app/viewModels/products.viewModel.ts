import { ProductVariantViewModel } from "./ProductVariant.viewModel";

export class ProductsViewModel {
    _id: string;
    Name: string;
    Price: number;
    Description: string;
    Category: string;
    Variants: ProductVariantViewModel[];
    

    constructor(
        _id?: string,
        Name?: string,
        Price?: number,
        Description?: string,
        Category?: string,
        Variants?: ProductVariantViewModel[],

    ) {
        this._id = _id || '';
        this.Name = Name || '';
        this.Price = Price || 0;
        this.Description = Description || '';
        this.Category = Category || '';
        this.Variants = Variants || [];
        
    }
}
import { ProductVariantViewModel } from "./ProductVariant.viewModel";

export class ProductsViewModel {
    _id: string;
    Name: string;
    Price: number;
    Description: string;
    Category: string;
    Variants: ProductVariantViewModel[];
    createdAt: string;
    updatedAt: string;


    constructor(
        _id?: string,
        Name?: string,
        Price?: number,
        Description?: string,
        Category?: string,
        Variants?: ProductVariantViewModel[],
        createdAt?: string,
        updatedAt?: string,

    ) {
        this._id = _id || '';
        this.Name = Name || '';
        this.Price = Price || 0;
        this.Description = Description || '';
        this.Category = Category || '';
        this.Variants = Variants || [];
        this.createdAt  = createdAt || '';
        this.updatedAt = updatedAt || ''
        

    }
}
import { CartVariantViewModel } from "./cartVariant.viewModel";

export class CartProductViewModel {
    _id: string;
    Name: string;
    Price: number;
    Description: string;
    Category: string;
    Variants: CartVariantViewModel[];
    CreatedAt: string;
    UpdatedAt: string;
    constructor(
        _id: string,
        name: string,
        price: number,
        description: string,
        category: string,
        variants: CartVariantViewModel[],
        createdAt: string,
        updatedAt: string,
    ) {
        this._id = _id || '';
        this.Name = name || '';
        this.Price = price || 0;
        this.Description = description || '';
        this.Category = category || '';
        this.Variants = variants || [];
        this.CreatedAt = createdAt || '';
        this.UpdatedAt = updatedAt || ''
    }
}
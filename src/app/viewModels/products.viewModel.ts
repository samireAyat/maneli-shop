export class ProductsViewModel {
    _id: string;
    Name: string;
    Price: number;
    Description: string;
    Category: string;
    Images: string[];
    Sizes: string[];
    Colors: string[];
    Stock: number;
    constructor(
        _id?: string,
        name?: string,
        price?: number,
        description?: string,
        category?: string,
        images?: string[],
        sizes?: string[],
        colors?: string[],
        stock?: number,

    ) {
        this._id = _id || ''
        this.Name = name || ''
        this.Price = price || 0;
        this.Description = description || ''
        this.Category = category || '';
        this.Images = images || []
        this.Sizes = sizes || [];
        this.Colors = colors || []
        this.Stock = stock || 0
    }
}
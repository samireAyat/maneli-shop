export class ProductSizeViewModel {
    _id: string;
    Name: string;
    Stock: number;

    constructor(
        _id?: string,
        Name?: string,
        Stock?: number
    ) {
        this._id = _id || '';
        this.Name = Name || '';
        this.Stock = Stock || 0;
    }
}
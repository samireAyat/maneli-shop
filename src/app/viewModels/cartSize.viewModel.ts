export class CartSizeViewModel {
    Name: string;
    Stock: number;
    _id: string;
    constructor(
        name?: string,
        stock?: number,
        _id?: string,
    ) {
        this.Name = name || '';
        this.Stock = stock || 0;
        this._id = _id || ''
    }
}
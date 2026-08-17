export class ProductSizeViewModel {
    ID: string;
    Name: string;
    Stock: number;

    constructor(
        ID?: string,
        Name?: string,
        Stock?: number
    ) {
        this.ID = ID || '';
        this.Name = Name || '';
        this.Stock = Stock || 0;
    }
}
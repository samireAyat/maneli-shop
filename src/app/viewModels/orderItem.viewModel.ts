export class OrderItemViewModel {
    ProductID: string;
    ProductName: string;
    Color: string;
    Size: string;
    Quantity: number;
    Price: number;
    Image: string;

    constructor() {
        this.ProductID = '';
        this.ProductName = '';
        this.Color = '';
        this.Size = '';
        this.Quantity = 0;
        this.Price = 0;
        this.Image = '';
    }
}
export class GuestCartItemViewModel {
    ProductID: string;
    VariantID: string;
    SizeID: string;
    Quantity: number;

    constructor(
        ProductID: string = '',
        VariantID: string = '',
        SizeID: string = '',
        Quantity: number = 1
    ) {
        this.ProductID = ProductID;
        this.VariantID = VariantID;
        this.SizeID = SizeID;
        this.Quantity = Quantity;
    }
}
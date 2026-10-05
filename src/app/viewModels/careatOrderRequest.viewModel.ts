export interface CreateOrderRequestViewModel {
    Items: {
        ProductID: string;
        ProductName: string;
        Color: string;
        Size: string;
        Quantity: number;
        Price: number;
        Image: string;
    }[];

    TotalAmount: number;
    TotalCount: number;
    ShippingAddress: any;
    PaymentTransactionID?: string;
}
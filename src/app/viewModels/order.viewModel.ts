import { OrderItemViewModel } from "./orderItem.viewModel";

export class OrderViewModel {
    _id: string = '';
    UserID: string = '';
    OrderNumber: string = '';
    Items: OrderItemViewModel[] = [];
    TotalAmount: number = 0;
    TotalCount: number = 0;
    ShippingAddress: any = null;
    Payment: {
        Status: string;
        TransactionID: string;
        PaidAt: string | null;
    } = {
            Status: '',
            TransactionID: '',
            PaidAt: null,
        };

    Status: string = '';
    createdAt: string = '';
    updatedAt: string = '';
}
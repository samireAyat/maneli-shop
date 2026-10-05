import { CreateOrderItemViewModel } from "./createOrderItem.viewModel";

export class CreateOrderViewModel {
  Items: CreateOrderItemViewModel[] = [];
  TotalAmount: number = 0;
  TotalCount: number = 0;
  ShippingAddress: any = null;
  PaymentTransactionID: string = '';
}
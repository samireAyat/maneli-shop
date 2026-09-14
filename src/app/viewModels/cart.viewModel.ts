import { CartItemViewModel } from './CartItem.viewModel'

export class CartViewModel {
    UserID: string;
    Items: CartItemViewModel[];
    Status: string;
    ErorCode:number;
    constructor(
        userID?: string,
        items?: CartItemViewModel[],
        status?: string,
        erorCode?:number
    ) {
        this.UserID = userID || '';
        this.Items = items || []
        this.Status = status || ''
        this.ErorCode = erorCode || 0
    }
}
import { CartItemViewModel } from './CartItem.viewModel'

export class CartViewModel {
    UserID: string;
    Items: CartItemViewModel[];
    constructor(
        userID?: string,
        items?: CartItemViewModel[],
    ) {
        this.UserID = userID || '';
        this.Items = items || []
    }
}
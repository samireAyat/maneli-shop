import { UserViewModel } from "./user.viewModel";


export class loginResponseViewModel {
    Message: string;
    Token: string;
    User: UserViewModel
    constructor(
        message?: string,
        token?: string,
        user?: UserViewModel
    ) {
        this.Message = message || '';
        this.Token = token || '';
        this.User = new UserViewModel
    }
}
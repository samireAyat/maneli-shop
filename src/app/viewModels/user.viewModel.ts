export class UserViewModel {
    // _id: string;
    Name: string;
    Email: string;
    Password: string;
    Role: string;
    constructor(
        // _id?: string,
        name?: string,
        email?: string,
        password?: string,
        role?: string,

    ) {
        // this._id = _id || ''
        this.Name = name || ''
        this.Email = email || ''
        this.Password = password || ''
        this.Role = role || ''
    }
}
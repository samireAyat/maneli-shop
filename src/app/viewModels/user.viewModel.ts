export class UserViewModel {
    // _id: string;
    Name: string;
    LastName: string;
    NationalCode: string;
    PhoneNumber: string;
    BirthDate: string;
    Email: string;
    Password: string;
    Role: string;
    constructor(
        // _id?: string,
        name?: string,
        lastName?: string,
        nationalCode?: string,
        phoneNumber?: string,
        birthDate?: string,
        email?: string,
        password?: string,
        role?: string,

    ) {
        // this._id = _id || ''
        this.Name = name || ''
        this.Email = email || ''
        this.Password = password || ''
        this.Role = role || ''
        this.LastName = lastName || ''
        this.NationalCode = nationalCode || '';
        this.PhoneNumber = phoneNumber || '';
        this.BirthDate = birthDate || ''
    }
}
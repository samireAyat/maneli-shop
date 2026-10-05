export class ProductSizeViewModel {
    _id: string;
    Name: string;
    Stock: number;
    ChestWidth: number;
    DressLength: number;
    SleeveLength: number;

    constructor(
        _id?: string,
        Name?: string,
        Stock?: number,
        chestWidth?: number,
        dressLength?: number,
        sleeveLength?: number,
    ) {
        this._id = _id || '';
        this.Name = Name || '';
        this.Stock = Stock || 0;
        this.ChestWidth = chestWidth || 0;
        this.DressLength = dressLength || 0;
        this.SleeveLength = sleeveLength || 0;
    }
}
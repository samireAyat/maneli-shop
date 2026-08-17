export class ProductColorViewModel {

    id: string;
    name: string;
    code: string;
    stock: number;

    existingImages: string[];
    selectedFiles: File[];
    imagePreviews: string[];

    constructor() {

        this.id = crypto.randomUUID();

        this.name = '';
        this.code = '';
        this.stock = 0;

        this.existingImages = [];
        this.selectedFiles = [];
        this.imagePreviews = [];

    }
}
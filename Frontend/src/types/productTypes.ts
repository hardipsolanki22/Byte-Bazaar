export interface ProductFormData {
    name: string
    description: string
    price: number;
    stock: number;
    category: string
    mainImage: FileList;
    subImages: FileList;
}
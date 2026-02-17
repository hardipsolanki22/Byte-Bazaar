export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    mainImage: string;
    subImages: string[];
    slug: string;
}
export interface SingleProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    mainImage: string;
    subImages: string[];
    slug: string;
    productRating: {
        totalRatings: number;
        averageRating: number;
        totalReviews: number;
    }
}
export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    mainImage: FileList;
    subImages?: FileList;
}
export interface AddProductRes {
    data: Product
    status: number;
    message: string;
    success: boolean
}
export interface GetProductsRes {
    data: {
        products: Product[];
        totalProducts: number;
        limit: number;
        page: number;
        totalPages: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
    }
    status: number;
    message: string;
    success: boolean
}
export interface GetProductRes {
    data: SingleProduct
    status: number;
    message: string;
    success: boolean

}

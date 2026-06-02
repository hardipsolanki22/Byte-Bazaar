export interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    mainImage: string;
    averageRating: number;
    ratingCount: number;
    stock: number;
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
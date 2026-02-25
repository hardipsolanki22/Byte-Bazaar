interface Product {
    _id: string;
    name: string;
    price: number;
    mainImage: string;
    slug: string;
    productRating: {
        averageRating: number;
        totalReviews: number;
    }
}
export interface Cart {
    _id: string | null;
    items: [
        {
            product: Product;
            quantity: number;
        }
    ] | [];
    coupon: {
        couponCode: string;
        discountPercentage: number;
    } | null;
    cartTotal: number;
    discountValue: number;
    discountedTotal: number;

}
export interface GetCartRes {
    data: Cart;
    message: string;
    status: number;
    success: boolean;
}
export interface AddItemOrUpdateItemQuantityReq {
    productSlug: string;
    quantity: number
}
export interface AddItemOrUpdateItemQuantityRes {
    data: {
        _id: string;
        items: [
            {
                product: string;
                quantity: number;

            }
        ],
        updatedProductItemslug: string;
    }
    statusCode: number;
    message: string;
    success: boolean;

}
export interface RemoveItemFromCartRes {
    data: {
        productSlug: string;
    }
    statusCode: number;
    message: string;
    success: boolean;
}
export interface ClearCartRes {
    data: {
        items: [],
        cartTotal: number;
        discountPercentage: number;
        discountedTotal: number;
    }
    statusCode: number;
    message: string;
    success: boolean;
}
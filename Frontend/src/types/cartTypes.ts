interface Product {
    _id: string;
    name: string;
    price: number;
    mainImage: string;
    productRating: {
        averageRating: number;
        totalReviews: number;
    }
}
export interface Cart {
    _id: string;
    items: [
        {
            product: Product;
            quantity: number;
        }
    ];
    coupon: {
        couponCode: string;
        discountPercentage: number;
    };
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
export interface addItemOrUpdateItemQuantityReq {
    productSlug: string;
    quantity: number
}
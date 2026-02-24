
export interface FilterOrders {
    status?: "PENDING" | "DELIVERED" | "CANCELLED";
    ispaymentdone?: boolean;
}
export interface Order {
    _id: string;
    orderPrice: number;
    user: {
        _id: string;
        fullName: string;
        avatar: string;
    };
    paymentType: "COD" | "ONLINE";
    status: string;
    isPaymentDone: boolean;
    createdAt: string;
    totalItems: number;
}
export interface SingleOrder {
    _id: string;
    order: [
        {
            product: {
                _id: string;
                name: string;
                price: number;
                mainImage: string;
            };
            quantity: number;
        }
    ],
    isPaymentDone: boolean;
    paymentType: "COD" | "ONLINE";
    address: {
        _id: string;
        addressLine: string;
        country: string;
        state: string;
        city: string;
        pincode: string;
    }
    user: {
        _id: string;
        fullName: string;
        email: string;
        avatar: string;
        phoneNumber: number;
    };
    coupon?: {
        _id: string;
        couponCode: string;
        discountPercentage: number;
    }
    status: "PENDING" | "DELIVERED" | "CANCELLED";
    orderPrice: number;
    cartTotal: number;
    discountValue: number;

}
export interface GetOrdersRes {
    data: {
        orders: Order[]
    };
    status: number;
    message: string;
    success: boolean
}
export interface GetSingleOrderRes {
    data: SingleOrder;
    status: number;
    message: string;
    success: boolean
}
export interface UpdateOrderStatusAndIsPaymentDone {
    status?: "PENDING" | "DELIVERED" | "CANCELLED";
    isPaymentDone?: boolean;
}
export interface UpdateOrderStatusAndIsPaymentDoneReq {
    orderId: string;
    data: UpdateOrderStatusAndIsPaymentDone

}
export interface UpdateOrderStatusAndIsPaymentDoneRes {
    data: {
        status: "PENDING" | "DELIVERED" | "CANCELLED";
        isPaymentDone: boolean;
    },
    status: number;
    message: string;
    success: boolean
}
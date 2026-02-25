interface CreatedBy {
    _id: string;
    fullName: string;
    avatar: string;
}

export interface Coupon {
    _id: string;
    couponCode: string;
    user: CreatedBy;
    discountPercentage: number;
    isActive: boolean;
    minCartValue: number;
    expiryTime: string;
    limit: number;
    isExpire: boolean;
    usedFrom: number;
}
export interface AddCouponReq {
    name: string;
    backCouponType?: "string" | "number";
    discountPercentage: number;
    isActive: boolean;
    expiryTime: string;
    minCartValue: number;
    limit: number;
}

export interface AddCouponRes {
    data: Coupon;
    message: string;
    status: number;
    success: boolean;
}

export interface GetCouponsRes {
    data: Coupon[];
    message: string;
    status: number;
    success: boolean;
}

export interface UpdateCoupon {
    name?: string;
    backCouponType?: "string" | "number";
    discountPercentage?: number;
    isActive?: boolean;
    expiryTime?: string;
    minCartValue?: number;
    limit?: number;
}

export interface UpdateCouponReq {
    couponId: string;
    data: UpdateCoupon;
}
export interface UpdateCouponRes {
    data: Coupon;
    message: string;
    status: number;
    success: boolean;
}

export interface DeleteCouponRes {
    data: {
        couponId: string
    };
    message: string;
    status: number;
    success: boolean;
}
export interface ApplyCouponres {
    message: string;
    statusCode: number;
    success: boolean;
}

export const DB_NAME = "byteBazaar";

export const userRole = {
    USER: "USER",
    ADMIN: "ADMIN"
}

export const orderStatus = {
    PENDING: "PENDING",
    CANCELLED: "CANCELLED",
    DELIVERED: "DELIVERED"
}

export const availableRole = Object.values(userRole)

export const availableOrderStatus = Object.values(orderStatus)

export const USER_TEMPORARY_TOKEN_EXPITY = 1000 * 20 * 60 // 20 minutes

export const COUPON_EXPIRY = 1000 * 60 * 30 // 30 minutes

export const userLoginType = {
    GOOGLE: "GOOGLE",
    FACEBOOK: "FACEBOOK",
    EMAIL_PASSWORD: "EMAIL_PASSWORD"
}

export const availableUserLogin = Object.values(userLoginType)

export const userPaymentType = {
    COD: "COD",
    STRIPE: "STRIPE"
}

export const availableUserPaymentType = Object.values(userPaymentType)
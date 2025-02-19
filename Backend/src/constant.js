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
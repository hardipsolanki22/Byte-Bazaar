import { body, param, query } from 'express-validator'
import { availableOrderStatus, availableUserPaymentType } from '../../constant.js'

const createOrderValidator = () => {
    return [
        body("paymentType")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Payment type is required")
            .isIn(availableUserPaymentType)
            .withMessage("Payment type must be either COD or STRIPE"),
    ]
}

const updateOrderStatusAndIsPaymentDoneValidator = () => {
    return [
        param("orderId")
            .trim()
            .notEmpty()
            .withMessage("Order id is required"),
        body("status")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Order status is required")
            .isIn(availableOrderStatus)
            .withMessage("Order status must be either PENDING or CANCELLED or DELIVERED"),
        body("isPaymentDone")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("isPaymentDone is not empty")
            .isBoolean()
            .withMessage("isPaymentDone field must be boolean")
    ]
}

export {
    createOrderValidator,
    updateOrderStatusAndIsPaymentDoneValidator
}
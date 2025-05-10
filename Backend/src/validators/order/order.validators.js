import { body } from 'express-validator'
import { availableUserPaymentType } from '../../constant.js'

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

export {
    createOrderValidator
}
import { body } from "express-validator"


const createCouponValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Coupon name is required"),
        body("discountValue")
            .notEmpty()
            .withMessage("Discount is required")
            .isNumeric()
            .withMessage("Discount must be numerical"),
        body("isActive")
            .notEmpty()
            .withMessage("Coupon status is required")
            .isBoolean()
            .withMessage("Coupon status must be boolean"),
        body("BackCouponType")
            .isIn(["number", "string"])
            .withMessage("Back coupon type must be either number or string")
    ]
}

const updateCouponValidator = () => {
    return [
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Coupon name is required"),
        body("discountValue")
            .optional()
            .notEmpty()
            .withMessage("Discount is required")
            .isNumeric()
            .withMessage("Discount must be numerical"),
        body("isActive")
            .optional()
            .notEmpty()
            .withMessage("Coupon status is required")
            .isBoolean()
            .withMessage("Coupon status must be boolean")
    ]
}

export {
    createCouponValidator,
    updateCouponValidator
}
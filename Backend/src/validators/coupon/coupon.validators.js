import { body } from "express-validator"


const createCouponValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Coupon name is required"),
        body("discountPercentage")
            .notEmpty()
            .withMessage("Discount percentage is required")
            .isFloat({ min: 1, max: 100 })
            .withMessage('Discount must be between 1% to 100%'),
        body("isActive")
            .notEmpty()
            .withMessage("Coupon status is required")
            .isBoolean()
            .withMessage("Coupon status must be boolean"),
        body("backCouponType")
            .isIn(["number", "string"])
            .withMessage("Back coupon type must be either number or string"),
        body("minCartValue")
            .notEmpty()
            .withMessage("Minimum cart value is required")
            .isNumeric()
            .withMessage("Minimum cart value must be numerical"),
        body("limit")
            .notEmpty()
            .withMessage("Limit is required")
            .isNumeric()
            .withMessage("Limit must be numerical")
            .isInt({ min: 1 })
            .withMessage("Limit must be at least 1")
        ,
        body("usedFrom")
            .optional()
            .notEmpty()
            .withMessage("usedFrom is required")
            .isNumeric()
            .withMessage("usedFrom must be numerical")

    ]
}

const updateCouponValidator = () => {
    return [
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Coupon name is required"),
        body("discountPercentage")
            .optional()
            .notEmpty()
            .withMessage("Discount percentage is required")
            .isFloat({ min: 1, max: 100 })
            .withMessage('Discount must be between 1% to 100%'),
        body("isActive")
            .optional()
            .notEmpty()
            .withMessage("Coupon status is required")
            .isBoolean()
            .withMessage("Coupon status must be boolean"),
        body("backCouponType")
            .optional()
            .isIn(["number", "string"])
            .withMessage("Back coupon type must be either number or string"),
        body("minCartValue")
            .optional()
            .notEmpty()
            .withMessage("Minimum cart value is required")
            .isNumeric()
            .withMessage("Minimum cart value must be numerical"),
        body("limit")
            .optional()
            .notEmpty()
            .withMessage("Limit is required")
            .isNumeric()
            .withMessage("Limit must be numerical")
            .isInt({ min: 1 })
            .withMessage("Limit must be at least 1"),
        body("usedFrom")
            .optional()
            .notEmpty()
            .withMessage("usedFrom is required")
            .isNumeric()
            .withMessage("usedFrom must be numerical")

    ]
}

export {
    createCouponValidator,
    updateCouponValidator
}
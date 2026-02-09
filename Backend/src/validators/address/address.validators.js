import { body } from "express-validator";

const createAddressValidator = () => {
    return [
        body("addressLine")
            .trim()
            .notEmpty()
            .withMessage("Address line is required"),
        body("country")
            .trim()
            .notEmpty()
            .withMessage("Country is required"),
        body("state")
            .trim()
            .notEmpty()
            .withMessage("State line is required"),
        body("city")
            .trim()
            .notEmpty()
            .withMessage("City is required"),
        body("isPrimary")
            .optional()
            .isBoolean()
            .withMessage("isPrimary must be a boolean value"),
        body("pincode")
            .trim()
            .notEmpty()
            .withMessage("Pincode line is required")
            .isNumeric()
            .withMessage("Invalid pincode")
    ]
}

const UpdateAddressValidator = () => {
    return [
        body("addressLine")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Address line is required"),
        body("country")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Country is required"),
        body("state")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("State line is required"),
        body("city")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("City is required"),
        body("isPrimary")
            .optional()
            .isBoolean()
            .withMessage("isPrimary must be a boolean value"),
        body("pincode")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Pincode line is required")
            .isNumeric()
            .withMessage("Invalid pincode")
    ]
}


export { createAddressValidator, UpdateAddressValidator };
import { body, param, query } from "express-validator"

const registerValidator = () => {
    return [
        body("fullName")
            .trim()
            .notEmpty()
            .withMessage("Full name is required")
            .isLength({ min: 3 })
            .withMessage("Full name must be at least 3 characters long"),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("phoneNumber")
            .optional()
            .notEmpty()
            .withMessage("Phone number is required")
            .isMobilePhone()
            .withMessage("Invalid Phonenumber")
    ]
}

const loginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ]
}

const forgotPasswordRequestValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email")
    ]
}

const updateUserDetailsValidator = () => {
    return [
        body("fullName")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Full name is required")
            .isLength({ min: 3 })
            .withMessage("Full name must be at least 3 characters long"),
        body("email")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),
        body("phoneNumber")
            .optional()
            .notEmpty()
            .withMessage("Phone number is required")
            .isMobilePhone()
            .withMessage("Invalid Phonenumber")
    ]
}


export {
    registerValidator,
    loginValidator,
    forgotPasswordRequestValidator,
    updateUserDetailsValidator,
}
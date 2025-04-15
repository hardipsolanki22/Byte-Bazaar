import { body, param } from 'express-validator'

const createProductValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Product name is required"),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required"),
        body("price")
            .notEmpty()
            .withMessage("Price is required")
            .isNumeric()
            .withMessage("Price must be numerical"),
        body("stock")
            .notEmpty()
            .withMessage("Product stock is required")
            .isNumeric()
            .withMessage("Stock must be numerical"),
        body("category")
            .trim()
            .notEmpty()
            .withMessage("Category is required")

    ]
}

const updateProductValidator = () => {
    return [
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Product name is required"),
        body("description")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Description is required"),
        body("price")
            .optional()
            .notEmpty()
            .withMessage("Price is required")
            .isNumeric()
            .withMessage("Price must be numerical"),
        body("stock")
            .optional()
            .notEmpty()
            .withMessage("Product stock is required")
            .isNumeric()
            .withMessage("Stock must be numerical"),
        body("category")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Category is required"),
        param("productId")
            .trim()
            .notEmpty()
            .withMessage("Products id is required")
    ]
}

export {
    createProductValidator,
    updateProductValidator
}
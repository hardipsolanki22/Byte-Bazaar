import { body } from "express-validator"

const createRatingValidator = () => {
    return [
        body("comment")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Comment is required"),
        body("rating")
            .notEmpty()
            .withMessage("Rating is required")
            .isNumeric({ min: 1, max: 5 })
            .withMessage('Rating must be between 1 to 5')
            .toInt(),
    ]
}

const updateRatingValidator = () => {
    return [
        body("comment")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Comment is required"),
        body("rating")
            .optional()
            .notEmpty()
            .withMessage("Rating is required")
            .isNumeric({ min: 1, max: 5 })
            .withMessage('Rating must be between 1 to 5')
            .toInt()
    ]
}

export {
    createRatingValidator,
    updateRatingValidator
}
import { validationResult } from "express-validator";
import { APIError } from "../utils/APIError.js";

const validate = (req, _, next) => {

    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    } else {
        const customError = errors.array().map(error => (
            {
                [error.path]: error.msg
            }
        ))
        throw new APIError(400, "Validation Error", customError)
    }
}

export { validate }
import { APIError } from "../utils/APIError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;    

    if (!(error instanceof APIError)) {  // if not then create new APIError instance
       
        // if statusCode is not set then set it to based on instance of error , 
        // otherwise set it to 500
        const statusCode = error.statusCode 
        || err instanceof Error ? 400 : 500
        || err instanceof mongoose.Error ? 400 : 500;
        
        // if error is existing then set it to error.message
        // otherwise set it to default message
        const message = error.message || "Something want to wrong"

        // create new APIError instance
        error = new APIError(statusCode, message, error.errors, error.stack)

    }
    
    // create response object
    const response = {
        ...error,
        message: error.message,
        stack:  process.env.NODE_ENV === "development" ? error.stack : "😣",
    }
    return res.status(response.statusCode).json(response)
}

export {errorHandler}
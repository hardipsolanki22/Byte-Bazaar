import { APIError } from "../utils/APIError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;    

    if (!(error instanceof APIError)) {  // if not then create new APIError instance
       
        const statusCode = error.statusCode 
        || err instanceof Error ? 400 : 500
        || err instanceof mongoose.Error ? 400 : 500;
      
        const message = error.message || "Something want to wrong"
        error = new APIError(statusCode, message, error.errors, error.stack)

    }
    
    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    }
    return res.status(response.statusCode).json(response)
}

export {errorHandler}
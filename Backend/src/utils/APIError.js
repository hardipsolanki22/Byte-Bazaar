class APIError extends Error {
    constructor(
        statusCode,
        message = "Something want to wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.success = false
        this.data = null
        if (stack) {
            this.stack = stack
        }
    }

}

export { APIError }
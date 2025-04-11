const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next))
        .catch(error => next(error));


// const asyncHandler = (func) => {    
//     return (req, res, next) => {
//         func(req, res, next).catch(error => next(error))
//     }
// }

// const asyncHandler = func => (req, res, next) => {
//     func(req, res, next).catch(error => next(error))
// }

// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next))
//         .catch(error => next(error))

//     }
// }

export { asyncHandler };
import jwt from "jsonwebtoken";
import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

    if (!token) {
        throw new APIError(401, "Unauthorized request")
    }

    const decodesInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodesInfo._id)
        .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

    if (!user) {
        throw new APIError(401, "Invalid access token")
    }


    req.user = user
    next()

})

// This middleware check whether an user is ADMIN 

const verifyPermisson = (role) => {
    // TODO::  return 
    return asyncHandler(async (req, _, next) => {
        if (!req.user?._id) {
            throw new APIError(401, "Unauthorizes request")
        }

        if (role === req.user.role) {
            next()
        } else {
            throw new APIError(403, "You are not allowed to perform this action")
        }

    })
}

export {
    verifyJWT,
    verifyPermisson
}
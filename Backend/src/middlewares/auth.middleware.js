import jwt from "jsonwebtoken";
import { APIError } from "../utils/APIError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



const verifyJWT = asyncHandler(async (req, res, next) => {
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

export { verifyJWT }
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { User } from "../models/user.model.js";
import { destroyCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { userRole } from "../constant.js";
import { emailVerificationMailGenContent, sendEmail } from "../utils/mail.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
       throw new APIError(500, error.message)

    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;

    if ([fullName, email, password].some(field => field?.trim() === "" || field === undefined)) {
        throw new APIError(400, "All fileds are required")
    }

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new APIError(409, "User already exist")
    }

    const avatarLoalPath = req.file?.path;

    if (!avatarLoalPath) {
        throw new APIError(400, "Avatar is required")
    }

    const avatar = await uploadCloudinary(avatarLoalPath)

    if (!avatar) {
        throw new APIError(500, "Internal server error while uploading avatar") 
    }

    const createUser = await User.create({
        fullName,
        email,
        password,
        role: userRole.USER,
        avatar,
        phoneNumber,
    })

    const user = await User.findById(createUser?._id)
    .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
    
    if (!user) {
        throw new APIError(500, "Internal server error while creating user")
    }

    const { unHashToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })

    // send mail
    await sendEmail({
        email,
        subject: "Please verify your email",
        mailGenContent: emailVerificationMailGenContent(
            fullName,
            `http://localhost:5000/api/v1/users/verify-email/${unHashToken}`
        )
    })
    return res
        .status(201)
        .json(
            new APIResponse(201, user, "Account created successfully and verification email has been sent on your email")
        )

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body    

    if (!email || !password) {
        throw new APIError(400, "All field are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new APIError(404, "User not found")
    }

    const validPassword =  user.isPasswordCurrect(password)

    if (!validPassword) {
        throw new APIError(400, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 10
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(200, { accessToken, refreshToken }, "Logged-In Successfully")
        )
})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: ""
            }
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new APIResponse(200, {}, "Logout Successfully")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new APIResponse(200, req.user, "Current User Fetched Successfully")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}
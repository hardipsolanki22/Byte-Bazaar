import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { User } from "../models/user.model.js";
import { destroyCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { userRole } from "../constant.js";
import { emailVerificationMailGenContent, forgotPasswordMailContent, sendEmail } from "../utils/mail.js";
import crypto from "crypto"
import jwt from 'jsonwebtoken'

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

// Todo:: using OAuth2 (Google, Facebook)
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;        

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new APIError(409, "User already exist")
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new APIError(400, "Avatar is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)

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
        .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry")

    if (!user) {
        throw new APIError(500, "Internal server error while creating user")
    }

    // hashedToken is save in database and unHashToken send in email-verify endpoint params
    const { unHashToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })

    // verificatio mail send
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

    const user = await User.findOne({ email })

    if (!user) {
        throw new APIError(404, "User not found")
    }

    const validPassword = await user.isPasswordCurrect(password)

    if (!validPassword) {
        throw new APIError(400, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
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
            new APIResponse(200, {}, "Logged Out Successfully")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new APIResponse(200, req.user, "Current User Fetched Successfully")
        )
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params

    if (!verificationToken) {
        throw new APIError(400, "Verification token is required")
    }

    // usually query parameters token is unhased token and the hashed token was
    //  save in the database (register controller)
    // so compare both token, first we need to convert unhashed token into hashed token

    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex")

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: {
            $gt: Date.now()
        }
    })

    // if user is found that means token is valid or not expired
    if (!user) {
        throw new APIError(400, "Token is invalid or expired")
    }

    // if user is found then we need to update emailVerificationToken and emailVerificationExpiry to undefined
    // so user can not use the same token again
    // and isEmailVerified to true
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    user.isEmailVerified = true
    await user.save({ validateBeforeSave: false })


    return res
        .status(200)
        .json(
            new APIResponse(200, { isEmailVerified: true }, "Email Verify Successfully")
        )


})

const resentEmailVerification = asyncHandler(async (req, res) => {
    // 1. find user
    // 2. if user is not exit then throw error 
    // 3. else check isEmailVerified field of user is true
    // 4. if true then throw error
    // 5. else generate token 
    // 6. save hashed token in the user collection
    // 7. send unHashed token in the email verify endpoint

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new APIError(404, "User does not exists")
    }

    if (user.isEmailVerified) {
        throw new APIError(400, "User email is already verified")
    }

    const { unHashToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })

    await sendEmail({
        email: user.email,
        subject: "Please verify your email",
        mailGenContent: emailVerificationMailGenContent(
            user.fullName,
            `http://localhost:5000/api/v1/users/verify-email/${unHashToken}`
        )
    })

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Mail has been sent to your mail box")
        )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer", "")

    if (!incomingRefreshToken) {
        throw new APIError(401, "Unauthorized request")
    }

    const decodedInfo = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedInfo._id)

    if (!user) {
        throw new APIError(401, "Invalid refresh token or expired")
    }

    // check if refresh token is same as in the database
    // if not then throw error
    if (incomingRefreshToken !== user.refreshToken) {
        throw new APIError(401, "Refresh token is expired or used")
    }

    // generate new access and refresh token
    // and save refresh token in the database
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .status(200)
        .json(
            new APIResponse(200, { accessToken, newRefreshToken }, "Access Token Refreshed Successfully")
        )

})

const forgotPasswordRequest = asyncHandler(async (req, res) => {
    // 1. get email
    // 2. if not them throw error
    // 3. else find user
    // 4. if user is not exists then throw error
    // 5 else generate forgot password token
    // 6. sent mail

    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new APIError(404, "User not found")
    }

    const { unHashToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.forgotPasswordToken = hashedToken
    user.forgotPasswordExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })

    await sendEmail({
        email: user.email,
        subject: "Forgot password",
        mailGenContent: forgotPasswordMailContent(
            user.fullName,
            `http://localhost:5000/api/v1/users/forgot-password/${unHashToken}`
        )
    })

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                {},
                "Password reset mail has been sent on your account"
            )
        )

})

const forgotPassword = asyncHandler(async (req, res) => {
    const { forgotPasswordToken } = req.params
    const { newPassword, confirmPassword } = req.body

    if (!newPassword || !confirmPassword) {
        throw new APIError(400, "All field are required")
    }

    if (confirmPassword !== newPassword) {
        throw new APIError(400, "Confirm password do not match")
    }

    if (!forgotPasswordToken) {
        throw new APIError(400, "Token is required")
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(forgotPasswordToken)
        .digest("hex")

    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: {
            $gt: Date.now()
        }
    })

    // if user is found that means token is valid or not expired
    if (!user) {
        throw new APIError(400, "Invalid token or expired")
    }

    user.password = confirmPassword

    // undefine the token and expiry time
    // so that user can not use the same token again
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Password Reset Successfully")
        )

})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    
    if (!(oldPassword && newPassword && confirmPassword)) {
        throw new APIError(400, "All field are required")
    }

    if (newPassword !== confirmPassword) {
        throw new APIError(400, "Conform password do not match")
    }


    const user = await User.findById(req.user._id)

    const validPassword = await user.isPasswordCurrect(oldPassword)

    if (!validPassword) {
        throw new APIError(400, "Invalid password")
    }

    user.password = confirmPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Password Changed Successfully")
        )

})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber } = req.body

    const user = await User.findById(req.user._id)
        .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry")

    if (fullName) {
        user.fullName = fullName
    } else if (email) {
        user.email = email
    } else if (phoneNumber) {
        user.phoneNumber = phoneNumber
    }

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new APIResponse(200, user, "User Details Updated Succssfully")
        )

})

// Todo:: if avatar is same as previouly avatar then don't push to cloudinary 
const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new APIError(400, "Avatar is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new APIError(500, "Internal server error while upload avatar")
    }

    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                avatar
            }
        },
        { new: true }
    ).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")


    await destroyCloudinary(avatarLocalPath)

    return res
        .status(200)
        .json(
            new APIResponse(200, user, "Avatar Updated Successfully")
        )
})

const userProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw APIError(400, "User id is required")
    }

    const user = await User.findById(userId)
    .select("-password -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry")    

    if (!user) {
        throw new APIError(404, "User not found")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, user, "User Profile Fetched Successfully")
        )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    verifyEmail,
    resentEmailVerification,
    refreshAccessToken,
    forgotPasswordRequest,
    forgotPassword,
    changePassword,
    updateUserDetails,
    updateAvatar,
    userProfile


}
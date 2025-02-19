import mongoose, { Schema } from "mongoose"
import { availableRole, userRole } from "../constant"

const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        String,
        required: [true, "Password is requird"]
    },
    role: {
        type: String,
        enum: availableRole,
        default: userRole.USER
    },
    phoneNumber: {
        type: Number,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    }

}, { timestamps: true })

export const User = mongoose.model("User", userSchema)
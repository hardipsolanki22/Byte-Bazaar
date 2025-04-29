import mongoose, { Schema } from "mongoose"

const couponSchema = new Schema({
    couponCode: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiryTime: {
        type: Date,
    }
}, { timestamps: true })

export const Coupon = mongoose.model("Coupon", couponSchema)
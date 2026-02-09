import mongoose, { Schema } from "mongoose"

// add new field limit number and used from
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
    discountPercentage: {
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
    },
    minCartValue: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    usedFrom: {
        type: Number,
        // default: 0
    }
}, { timestamps: true })

export const Coupon = mongoose.model("Coupon", couponSchema)
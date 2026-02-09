import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    addressLine: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    isPrimary: {
        type: Boolean,
        default: true
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })

export const Address = mongoose.model("Address", addressSchema)
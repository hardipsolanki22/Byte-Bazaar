import mongoose, { Schema } from "mongoose";
import { availableOrderStatus, orderStatus } from "../constant";

const orderSchema = new Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    address: {
        ref: "Address",
        type: Schema.Types.ObjectId,
        required: true
    },
    cart: {
        ref: "Cart",
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: availableOrderStatus,
        default: orderStatus.PENDING
    },
    paymentId: {
        type: String
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Oreder = mongoose.model("Order", orderSchema)
import mongoose, { Schema } from "mongoose";
import { availableOrderStatus, availableUserPaymentType, orderStatus, userPaymentType,} from "../constant.js";

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
    paymentType: {
        type: String,
        enun: availableUserPaymentType,
        default: userPaymentType.COD
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

export const Order = mongoose.model("Order", orderSchema)
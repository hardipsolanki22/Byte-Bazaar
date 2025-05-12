import mongoose, { Schema } from "mongoose";
import { availableOrderStatus, availableUserPaymentType, orderStatus, userPaymentType, }
    from "../constant.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
    items: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: {
                    type: Number
                }
            }
        ],
        required: true
    },
    coupon: {
        type: Schema.Types.ObjectId,
        ref: "Coupon"
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

orderSchema.plugin(mongooseAggregatePaginate)

export const Order = mongoose.model("Order", orderSchema)
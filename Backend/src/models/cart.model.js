import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: [1, "Quantity must be greater than 0"]

    }
})

const cartSchema = new Schema({
    // items: {
    //     type: [
    //         {
    //             product: {
    //                 ref: "Product",
    //                 type: Schema.Types.ObjectId
    //             },
    //             quantity: {
    //                 type: Number,
    //                 default: 1,
    //                 min: [1, "Quantity must be greater than 0"],
    //                 required: true
    //             }
    //         }
    //     ]
    // },
    items: [itemSchema],
    user: {
        red: "User",
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema)
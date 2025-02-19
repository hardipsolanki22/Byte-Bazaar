import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    ref: "Product",
                    type: Schema.Types.ObjectId
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: [1, "Quantity must be greater than 0"],
                    required: true
                }
            }
        ]
    },
    user: {
        red: "User",
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema)
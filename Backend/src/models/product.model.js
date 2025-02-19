import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    category: {
        ref: "Category",
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    owner: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    subImage: {
        type: [
            {
                type: String
            }
        ],
        default: []
    }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)
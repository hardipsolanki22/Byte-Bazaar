import mongoose, { Schema } from "mongoose";

import aggregatePaginate from "mongoose-aggregate-paginate-v2"

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
        default: 1
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
    subImages: {
        type: [String],
        default: []
    },
    slug: {
        type: String,
        required: true
    }
}, { timestamps: true })

productSchema.plugin(aggregatePaginate)

export const Product = mongoose.model("Product", productSchema)
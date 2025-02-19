import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    product: {
        ref: "Product",
        type: Schema.Types.ObjectId,
        required: true
    },
    rateing: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Rating = mongoose.model("Rating", ratingSchema)
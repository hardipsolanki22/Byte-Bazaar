import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    comment: {
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
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true })

export const Rating = mongoose.model("Rating", ratingSchema)
import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"


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

ratingSchema.plugin(aggregatePaginate)

export const Rating = mongoose.model("Rating", ratingSchema)
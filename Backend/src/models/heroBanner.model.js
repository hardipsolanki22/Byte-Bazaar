import mongoose, { Schema } from "mongoose";

const heroBannerSchema = new Schema({
    image: {
        type: String,
        required: true,
        default: "offerUrl"
    }
})

export const HeroBanner = mongoose.model("HeroBanner", heroBannerSchema)
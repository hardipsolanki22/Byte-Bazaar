import mongoose, { Schema } from "mongoose";

const hiroBannerSchema = new Schema({
    images: {
        type: [
            {
                image: {
                    type: String,
                    required: true
                }
            }
        ]
    }
}, { timestamps: true })

export const HiroBanner = mongoose.model("Hirobanner", hiroBannerSchema)
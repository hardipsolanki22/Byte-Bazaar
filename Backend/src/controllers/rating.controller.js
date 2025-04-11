import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Product } from "../models/product.model.js";
import { Rating } from "../models/rating.modle.js";

const createRating = asyncHandler(async (req, res) => {
    const { comment, ratingBYUser } = req.body;
    const { productId } = req.params;

    if (!comment || rating) {
        throw new APIError(400, "All fields are required")
    }

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    // use uknown id then check what output of the product what does it retuen
    const product = await Product.findById(productId)

    if (product) {
        throw new APIError(404, "Product not found")
    }

    const createdRating = await Rating.create({
        comment,
        product: productId,
        user: req.user._id,
        ratingBYUser
    })

    const rating = await Rating.findById(createdRating._id)

    if (!rating) {
        throw new APIError(500, "Internal server error while creating rating")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, rating, "Rating Created Successfully")
        )

})

const deleteRating = asyncHandler(async (req, res) => {
    const { ratingId } = req.params;

    if (!ratingId) {
        throw new APIError(400, "Rating id is required")
    }

    const rating = await Rating.findByIdAndDelete(ratingId)

    if (!rating) {
        throw new APIError(404, "Rating does not exist")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Rating Deleted Successfully")
        )

})

export {
    createRating,
    deleteRating
}
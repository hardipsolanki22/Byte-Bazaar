import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Product } from "../models/product.model.js";
import { Rating } from "../models/rating.modle.js";
import { aggregatePaginateOption } from "../utils/helpers.js"
import mongoose from "mongoose";

// upadte it only purcher user can rate the product
// comment is optional
// review means comment
// rating means star
const createRating = asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const { productId } = req.params;

    // if (!comment || !rating) {
    //     throw new APIError(400, "All fields are required")
    // }

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    // use uknown id then check what output of the product what does it retuen
    const product = await Product.findById(productId)

    if (!product) {
        throw new APIError(404, "Product does not exist")
    }

    // check if user has already rated the product
    const isRatingExists = await Rating.findOne({
        user: req.user._id,
        product: productId
    })

    if (isRatingExists) {
        throw new APIError(409, "You have already rated this product")
    }

    // check if rating is between 1 and 5
    if (rating < 1 || rating > 5) {
        throw new APIError(400, "Rating must be between 1 and 5")
    }


    // create rating
    const createRating = await Rating.create({
        comment,
        product: productId,
        user: req.user._id,
        rating
    })


    if (!createRating) {
        throw new APIError(500, "Internal server error while creating rating")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, createRating, "Rating Created Successfully")
        )

})

const getAllRating = asyncHandler(async (req, res) => {
    // get product id
    // find product
    // use aggrigation pipeline to lookup user
    // and find average of raring
    // paginate query
    // return response


    const { productId } = req.params;
    const { page = 1, limit = 8 } = req.query;

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new APIError(404, "Product does not exist")
    }


    const aggrigation = Rating.aggregate([
        {
            $match: {
                product: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            // lookup user to ge user details first pipeline
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    // inner pipeline to get need only details
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$user", 0]
                }
            }
        },
        {
            $project: {
                product: 0,
                __v: 0,
            }
        },
        {
            $group: {
                // group whole document to cal reviews, rating etc
                _id: null,
                totalRatings: { $sum: 1 },
                totalReviews: {
                    // if comment is !null or ! undefined then add by 1 ... count total reviews
                    $sum: {
                        $cond: [
                            { $ifNull: ["$comment", false] },
                            1,
                            0
                        ]
                    }
                },
                averageRating: { $avg: "$rating" },
                // get user details name,avatar etc
                users: {
                    $push: "$$ROOT",
                },
                // 1 to 5 categorized each rate (star 1 - 5) 
                // count it  
                excellent: {
                    $sum: {
                        $cond: [
                            { $eq: ["$rating", 5] },
                            1,
                            0
                        ],
                    }
                },
                Good: {
                    $sum: {
                        $cond: [
                            { $eq: ["$rating", 4] },
                            1,
                            0
                        ],
                    }
                },
                Average: {
                    $sum: {
                        $cond: [
                            { $eq: ["$rating", 3] },
                            1,
                            0
                        ],
                    }
                },
                Poor: {
                    $sum: {
                        $cond: [
                            { $eq: ["$rating", 2] },
                            1,
                            0
                        ],
                    }
                },
                Terrible: {
                    $sum: {
                        $cond: [
                            { $eq: ["$rating", 1] },
                            1,
                            0
                        ],
                    }
                },
            }
        },

    ])

    const ratings = await Rating.aggregatePaginate(aggrigation,
        aggregatePaginateOption({
            page,
            limit,
            customLabels: {
                docs: "ratings",
                totalDocs: "totalRatings",
            }
        })
    )


    return res
        .status(200)
        .json(
            new APIResponse(200, ratings, "All ratings fetched successgfully")
        )

})

const updateRating = asyncHandler(async (req, res) => {
    const { ratingId } = req.params;
    const { comment, rating } = req.body;

    // if (!comment || !rating) {
    //     throw new APIError(400, "All fileds are required")
    // }

    if (!ratingId) {
        throw new APIError(400, "Rating id is required")
    }

    const updatedRating = await Rating.findByIdAndUpdate(ratingId,
        {
            $set: {
                comment,
                rating
            }
        },
        {
            new: true
        }
    )

    if (!updatedRating) {
        throw new APIError(404, "Rating does not exist")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, updatedRating, "Rating updated successfully")
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
    getAllRating,
    updateRating,
    deleteRating,
}
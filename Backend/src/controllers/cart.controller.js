import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { Product } from "../models/product.model.js"
import { Cart } from "../models/cart.model.js"


const addItemOrUpdateItemQuantity = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { quantity } = req.body


    if (!productId || !quantity) {
        throw new APIError(400, "Product id and quantity are required")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new APIError(404, "Product does not exists")
    }

    if (product.stock < quantity) {
        throw new APIError(400,
            product.stock > 0
                ?
                `Only ${product.stock} products are remaining.But you adding ${quantity}`
                :
                "Product is out of stock"
        )
    }

    const cart = await Cart.findOne({
        user: req.user._id
    })

    if (!cart) {
        const newCart = await Cart.create({
            user: req.user._id,
            items: [
                {
                    product: productId,
                    quantity
                }
            ]
        })
        return res
            .status(201)
            .json(
                new APIResponse(201, newCart, "Cart created and item added successfully")
            )
    }

    const isItemExist = cart.items.find(item => item.product.toString() === productId)

    if (isItemExist) {
        isItemExist.quantity = quantity
    } else {
        cart.items.push({
            product: productId,
            quantity
        })
    }

    await cart.save({ validateBeforeSave: true })

    return res
        .status(200)
        .json(
            new APIResponse(200, cart, "Item added to cart successfully")
        )

})

const getUserCart = asyncHandler(async (req, res) => {

    const cart = await Cart.aggregate([
        {
            $match: {
                user: req.user._id
            }
        },
        {
            $unwind: "$items"
        },
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "productDetails",
                pipeline: [
                    {
                        $lookup: {
                            from: "ratings",
                            localField: "_id",
                            foreignField: "product",
                            as: "productRating",
                        }
                    },
                    {
                        $addFields: {
                            countProductRating: {
                                $size: {
                                    $ifNull: ["$productRating", 0]
                                }
                            },
                            averageRating: {
                                $avg: "$productRating.rating"
                            },
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            price: 1,
                            mainImage: 1,
                            countProductRating: 1,
                            averageRating: 1
                        }
                    },
                ]
            }
        },
        {
            $addFields: {
                "items.product": "$productDetails"
            }
        },
        {
            $project: {
                product: { $first: "$items.product" },
                quantity: "$items.quantity",
            }
        },
        {
            $group: {
                _id: "$_id",
                items: {
                    $push: "$$ROOT"
                },
                cartTotal: {
                    $sum: {
                        $multiply: ["$product.price", "$quantity"]
                    }
                }
            }
        }
    ])

    return res
        .status(200)
        .json(
            new APIResponse(200, cart[0] || [], "Cart Fetched Successfully")
        )
})

const removeItem = asyncHandler(async (req, res) => {
    const { productId } = req.params

    if (!productId) {
        throw new APIError(400, "Product id is required")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new APIError(404, "Product does not exists")
    }

    const cart = await Cart.findOneAndUpdate(
        {
            user: req.user._id,

        },
        {
            $pull: {
                items: {
                    product: productId
                }
            }
        }
    )

    if (!cart) {
        throw new APIError(404, "Cart does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Item Remove From Cart Successfully")
        )

})

const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
        {
            user: req.user._id,
        },
        {
            $set: {
                items: []
            }
        }
    )

    if (!cart) {
        throw new APIError(404, "Cart does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Cart Clear Successfully")
        )


})


export {
    addItemOrUpdateItemQuantity,
    getUserCart,
    removeItem,
    clearCart
}
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { getCart } from "../controllers/cart.controller.js";
import { Address } from "../models/address.model.js";
import { Order } from "../models/order.model.js";
import { availableOrderStatus, userPaymentType } from "../constant.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { orderConfirmationMailgenContent, sendEmail } from "../utils/mail.js";
import Stripe from "stripe"
import { aggregatePaginateOption } from "../utils/helpers.js";
import mongoose, { mongo } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const updateProductQuantityAndClearCartHalper = async (req) => {
    // get user cart
    // update product quantity by items inside quantity
    // send mail
    // clear cart

    try {
        const userCart = await getCart(req.user._id)

        const bulkStockUpdates = userCart.items.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: {
                        $inc: {
                            stock: -item.quantity
                        }
                    }
                }
            }
        })

        await Product.bulkWrite(bulkStockUpdates, { skipValidation: true })

        await Cart.findOneAndUpdate({
            user: req.user._id,
            items: [],
            coupon: null
        })

        await sendEmail({
            email: req.user.email,
            subject: "Order Confirmed",
            mailGenContent: orderConfirmationMailgenContent(
                req.user.fullName,
                userCart.items,
                userCart.discountedTotal
            )
        })
    } catch (error) {
        throw new APIError(500, error.message || "Internal server error")
    }
}

const createOrder = asyncHandler(async (req, res) => {
    // -> get addressId and payment type (default is Cash on Delivery)
    // -> find address
    // -> check payment type
    // -> if payment type is not STRIPE,
    // -> create order with payment type is COD
    // -> update product quantity, send mail to the user and than clear the cart
    // -> once payment is done and product is delivered, update order status 
    //    and isPayment field in COD payment type
    // -> if payment type is STRIPE 
    // -> create STRIPE payment 
    // -> on success create order 
    //    update product qunatity, send mail and clear cart
    // -> once product is delivered update order status

    const { addressId } = req.params;
    const { paymentType } = req.body

    if (!addressId) {
        throw new APIError(400, "Address id is required")
    }

    const address = await Address.findById(addressId)

    if (!address) {
        throw new APIError(404, "Address not found")
    }

    const cart = await getCart(req.user._id)

    if (!cart.items.length) {
        throw new APIError(400, "User cart is empty")
    }

    if (paymentType !== userPaymentType.STRIPE) {
        const order = await Order.create({
            orderPrice: cart.discountedTotal,
            address: addressId,
            items: cart.items,
            user: req.user._id,
            coupon: cart.items[0].coupon,
            paymentType
        })
        await updateProductQuantityAndClearCartHalper(req)
        return res
            .status(201)
            .json(
                new APIResponse(201, order, "Order Create Successfully")
            )
    } else {
        const line_items = cart.items.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.product.name,
                        images: [item.product.mainImage],
                        description: item.product.description,
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.quantity
            }
        })
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: "http://localhost:5000/api/v1/order/stripe-payment-verify?success=true&session={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5000/api/v1/order/stripe-payment-verify?success=false",
            metadata: {
                addressId
            }
        })

        return res
            .status(201)
            .json(
                new APIResponse(201, session, "Stripe Payment Initilized Successfully")
            )
    }

})

const verifyStripePayment = asyncHandler(async (req, res) => {
    const { success, session: sessionId } = req.query

    if (success === "true") {

        const session = await stripe.checkout.sessions.retrieve(sessionId)
        const cart = await getCart(req.user._id)

        const order = await Order.create({
            orderPrice: cart.discountedTotal,
            address: session.metadata.addressId,
            items: cart.items,
            coupon: cart.items[0].coupon,
            user: req.user._id,
            paymentType: "STRIPE",
            paymentId: session.payment_intent,
            isPaymentDone: true
        })

         await updateProductQuantityAndClearCartHalper(req)

        return res
            .status(201)
            .json(
                new APIResponse(201, order, "Order Create Successfully")
            )
    } else {
        return res
            .status(200)
            .json(
                new APIResponse(200, { cancelled: true }, "Payment Cancelled")
            )
    }
})

const updateOrderStatusAndIsPaymentDone = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const { status, isPaymentDone } = req.body

    const order = await Order.findByIdAndUpdate(orderId,
        {
            $set: {
                status,
                isPaymentDone
            }
        },
        { new: true }
    )

    if (!order) {
        throw new APIError(404, "Order does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, order, "Order Updated Successfully")
        )

})

const getOrdersByAdmin = asyncHandler(async (req, res) => {
    const { status, ispaymentdone, page = 1, limit = 8 } = req.query
    const matchStage = {}

    if (status && ispaymentdone) {
        matchStage.isPaymentDone = ispaymentdone === "true"
        availableOrderStatus.includes(status.toUpperCase())
            ? matchStage.status = status.toUpperCase()
            : matchStage
    } else if (status)
        availableOrderStatus.includes(status.toUpperCase())
            ? matchStage.status = status.toUpperCase()
            : matchStage
    else if (ispaymentdone)
        matchStage.isPaymentDone = ispaymentdone === "true"

    const aggregation = Order.aggregate([
        {
            // match stage to filter orders based on status and isPaymentDone
            $match: { ...matchStage }

        },
        {
            // lookup to get user details
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
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
                // overwrite user field to get first user object
                user: {
                    $first: "$user"
                },
                // get total items in the order
                totalItems: {
                    $size: "$items"
                }
            }
        },
        {
            // project stage to select required fields
            $project: {
                user: 1,
                orderPrice: 1,
                paymentType: 1,
                status: 1,
                isPaymentDone: 1,
                totalItems: 1
            }
        }
    ])

    // paginate the aggregation result
    // using aggregatePaginateOption utility function
    const orders = await Order.aggregatePaginate(aggregation,
        aggregatePaginateOption({
            page,
            limit,
            customLabels: {
                totalDocs: "totalOrders",
                docs: "orders"
            }
        })
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, orders, "Orders Fetches Successfully")
        )

})

const getSingleOrderByAdmin = asyncHandler(async (req, res) => {
    const { orderId } = req.params

    if (!orderId) {
        throw new APIError(400, "Order id is required")
    }


    const order = await Order.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(orderId)
            }
        },
        {
            // Unwind the items array to process each item individually
            $unwind: "$items"
        },
        {
            // Lookup to join with products collection to get product details
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            mainImage: 1,
                            price: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                // Add the first product from the lookup result to items.product
                "items.product": {
                    $first: "$product"
                },
            },
        },
        {
            // Project the necessary fields for the final output
            $project: {
                "product": "$items.product",
                "quantity": "$items.quantity",
                orderPrice: 1,
                paymentType: 1,
                isPaymentDone: 1,
                address: 1,
                coupon: 1,
                user: 1,
                status: 1,
            }
        },
        {
            // Group by order id
            $group: {
                _id: "$_id",
                // push all items into an order array
                order: {
                    $push: {
                        product: "$product",
                        quantity: "$quantity"
                    }
                },
                // collect the first occurrence of each field
                isPaymentDone: { $first: "$isPaymentDone" },
                paymentType: { $first: "$paymentType" },
                address: { $first: "$address" },
                user: { $first: "$user" },
                status: { $first: "$status" },
                coupon: { $first: "$coupon" },
                orderPrice: { $first: "$orderPrice" },
                // calculate the total cart value
                cartTotal: {
                    $sum: {
                        $multiply: ["$product.price", "$quantity"]
                    }
                }
            },

        },
        {
            // Lookup to join with addresses collection to get address details
            $lookup: {
                from: "addresses",
                localField: "address",
                foreignField: "_id",
                as: "address"
            }
        },
        {
            // Lookup to join with users collection to get user details
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                            email: 1
                        }
                    }
                ]
            }
        },
        {
            // Lookup to join with coupons collection to get coupon details
            $lookup: {
                from: "coupons",
                localField: "coupon",
                foreignField: "_id",
                as: "coupon",
                pipeline: [
                    {
                        $project: {
                            discountPercentage: 1,
                            couponCode: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                // Add the first occurrence of each field
                "address": { $first: "$address" },
                "user": { $first: "$user" },
                "coupon": { $first: "$coupon" },
                // Calculate the discount value based on the cart total and discount percentage
                discountValue: {
                    $ifNull: [
                        {
                            $divide: [
                                {
                                    $multiply: [
                                        { $arrayElemAt: ["$coupon.discountPercentage", 0] },
                                        "$cartTotal"
                                    ]
                                },
                                100
                            ]
                        }
                        , 0
                    ]
                },
            }
        },
    ])

    if (!order.length) {
        throw new APIError(404, "Order does not exist")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, order, "Order Fatched Successfully")
        )

})

const getUserOrders = asyncHandler(async (req, res) => {
    const { page = 1, limit = 8 } = req.query
    const aggregate = Order.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            // lookup to get product details
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            mainImage: 1
                        }
                    }
                ]
            }
        },
        {
            // ovwrite items.product with the first product from the lookup result
            $addFields: {
                "items.product": {
                    $first: "$product"
                },
                // calculate total items in the order
                totalItems: { $size: "$items" }
            }
        },
        {
            // project stage to select required fields
            $project: {
                "products": "$items.product",
                status: 1,
                totalItems: 1
            }
        }
    ])

    // paginate the aggregation result
    const orders = await Order.aggregatePaginate(aggregate, aggregatePaginateOption({
        page,
        limit,
        customLabels: {
            totalDocs: "totalOrders",
            docs: "orders"
        }
    }))

    return res
        .status(200)
        .json(
            new APIResponse(200, orders, "User Orders Fetches Successfully")
        )
})

const getUserSingleOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params

    if (!orderId) {
        throw new APIError(400, "Order id is required")
    }

    const order = await Order.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(orderId)
            }
        },
        {
            // Unwind the items array to process each item individually
            $unwind: "$items"
        },
        {
            // Lookup to get product details with required field in inner pipeline
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            mainImage: 1,
                            price: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                "items.product": {
                    $first: "$product"
                }
            }
        },
        {
            // Project the necessary fields for the final output
            $project: {
                "product": "$items.product",
                "quantity": "$items.quantity",
                orderPrice: 1,
                paymentType: 1,
                isPaymentDone: 1,
                address: 1,
                coupon: 1,
                status: 1
            }
        },
        {
            // Group by order id to aggregate items into an order array
            $group: {
                _id: "$_id",
                // push all items into an order array
                order: {
                    $push: {
                        product: "$product",
                        quantity: "$quantity"
                    }
                },
                // collect the first occurrence of each field
                isPaymentDone: { $first: "$isPaymentDone" },
                paymentType: { $first: "$paymentType" },
                status: { $first: "$status" },
                orderPrice: { $first: "$orderPrice" },
                // calculate the total cart value
                cartTotal: {
                    $sum: {
                        $multiply: ["$product.price", "$quantity"]
                    }
                },
                coupon: { $first: "$coupon" },
            }
        },
        {
            // lookup to get coupon details
            $lookup: {
                from: "coupons",
                localField: "coupon",
                foreignField: "_id",
                as: "coupon",
                pipeline: [
                    {
                        $project: {
                            discountPercentage: 1,
                            couponCode: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                coupon: { $first: "$coupon" },
                // calculate the discount value based on the cart total and discount percentage
                discountValue: {
                    $ifNull: [
                        {
                            $divide: [
                                {
                                    $multiply: [
                                        { $arrayElemAt: ["$coupon.discountPercentage", 0] },
                                        "$cartTotal"
                                    ]
                                },
                                100
                            ]
                        }
                        , 0
                    ]
                },
            }
        }

    ])

    if (!order.length) {
        throw new APIError(404, "Order does not exist")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, order, "Order Fetched Successfully")
        )
})

export {
    createOrder,
    verifyStripePayment,
    updateOrderStatusAndIsPaymentDone,
    getOrdersByAdmin,
    getUserOrders,
    getSingleOrderByAdmin,
    getUserSingleOrder
}
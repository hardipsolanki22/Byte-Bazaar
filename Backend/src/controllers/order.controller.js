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
import mongoose from "mongoose";

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

        // await updateProductQuantityAndClearCartHalper(req)

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
            $match: { ...matchStage }

        },
        {
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
                user: {
                    $first: "$user"
                },
                // totalItems: {
                //     $size: "$items"
                // }
            }
        },
        {
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

const getMyOrdres = asyncHandler(async (req, res) => {
    const { page = 1, limit = 8 } = req.query
    const aggregate = Order.aggregate([
        {
            $match: {
                // TODO: check mongoose object id syntax
                user: new mongoose.Types.ObjectId(req.user._id)
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
            $addFields: {
                "items.product": {
                    $first: "$product"
                }
            }
        },
        {
            $project: {
                "product": "$items.product",
                status: 1
            }
        }
    ])

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

export {
    createOrder,
    verifyStripePayment,
    updateOrderStatusAndIsPaymentDone,
    getOrdersByAdmin,
    getMyOrdres
}
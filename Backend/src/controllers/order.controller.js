import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { getCart } from "../controllers/cart.controller.js";
import { Address } from "../models/address.model.js";
import { Order } from "../models/order.model.js";
import { userPaymentType } from "../constant.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { orderConfirmationMailgenContent, sendEmail } from "../utils/mail.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const updateProductQuantityAndClearCartHalper = async (req) => {
    // get user cart
    // update product quantity by items inside quantity
    // send mail
    // clear cart

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
}

const createOrder = asyncHandler(async (req, res) => {
    // -> get addressId and payment type (default is Cash on Delivery)
    // -> find address
    // -> check payment type
    // -> if payment type is not STRIKE,
    // -> create order with payment type is COS 
    // -> update product quantity, send mail to the user and than clear cart
    // -> once payment is done and product is delivered update order status 
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
            cart: cart._id,
            user: req.user._id,
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
            success_url: "http://localhost:5000/api/v1/order/payment?success=true&session={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5000/api/v1/order/payment?success=false",
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

const stripePaymentVerify = asyncHandler(async (req, res) => {
    const { success, session: sessionId } = req.query

    if (success === "true") {

        const session = await stripe.checkout.sessions.retrieve(sessionId)
        const cart = await getCart(req.user._id)

        const order = await Order.create({
            orderPrice: cart.discountedTotal,
            address: session.metadata.addressId,
            cart: cart._id,
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

export {
    createOrder,
    stripePaymentVerify
}
import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from '../utils/APIResponse.js'
import { Coupon } from "../models/coupon.model.js"
import { COUPON_EXPIRY } from "../constant.js"
import { Cart } from "../models/cart.model.js"
import { getCart } from "./cart.controller.js"

const generateRandomCode = (length, type) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const nums = "012345678"
    let randomCode = ""
    for (let i = 0; i < length; i++) {
        if (type !== "number") {
            randomCode += chars.charAt(
                Math.floor(Math.random() * chars.length)
            )
        } else {
            randomCode += nums.charAt(
                Math.floor(Math.random() * nums.length)

            )
        }
    }
    return randomCode
}

const createCoupon = asyncHandler(async (req, res) => {
    const { name, backCouponType = "number", discountPercentage, isActive, minCartValue } = req.body

    // generate randome code
    const randomCode = generateRandomCode(3, backCouponType)

    const isCouponExists = await Coupon.findOne({
        couponCode: name + randomCode
    })

    if (isCouponExists) {
        throw new APIError(409, "Coupon code is already exist")
    }

    const coupon = await Coupon.create({
        couponCode: name + randomCode,
        discountPercentage,
        isActive,
        expiryTime: Date.now() + COUPON_EXPIRY,
        minCartValue,
        user: req.user._id
    })

    if (!coupon) {
        throw new APIError(500, "Something want to wrang while create coupon")
    }

    return res
        .status(201)
        .json(
            new APIResponse(201, coupon, "Coupon Create Successfully")
        )


})

const getCopuns = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({}).populate("user", "fullName avatar")

    return res
        .status(200)
        .json(
            new APIResponse(200, coupons, "Coupons Fetched Successfully")
        )
})

const updateCoupon = asyncHandler(async (req, res) => {
    // -> get fileds,  user can update that
    // -> check BackCoupon type is exist or not
    // -> if backCoupon type and coupon code is not undefined 
    //    than remove random code from coupon code
    //    and generate backCoupon type code
    // -> if backCoupon type is undefined and coupon code is not undefined
    //    than user modify excual coupon code
    //    before update coupon document, first we need to see, 
    //    if modify coupon is exist or not
    // -> if exist than throw error
    // -> update coupon document

    const couponId = req.params.couponId
    const { couponCode, backCouponType, discountPercentage, isActive, minCartValue } = req.body

    if (!couponId) {
        throw new APIError(400, "Coupon id is required")
    }

    let coupon;

    if (backCouponType && couponCode) {
        const couponCodeOfArray = couponCode?.split("")

        // remove randome 3 digit code from coupon
        couponCodeOfArray?.splice(couponCodeOfArray.length - 3, 3)
        const removedLastCodeFromCoupon = couponCodeOfArray?.join("")

        // generate new 3 digit code 
        const randomeCode = generateRandomCode(3, backCouponType)
        coupon = removedLastCodeFromCoupon + randomeCode
    } else
        coupon = couponCode

    const isCouponExists = await Coupon.findOne({
        couponCode: coupon
    })

    if (isCouponExists) {
        throw new APIError(409, "Coupon is already exists")
    }

    const modifyCoupon = await Coupon.findByIdAndUpdate(couponId,
        {
            $set: {
                couponCode: coupon,
                discountPercentage,
                isActive,
                minCartValue
            }
        },
        {
            new: true
        }
    )

    if (!modifyCoupon) {
        throw new APIError(404, "Coupon does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, modifyCoupon, "Coupon Update Successfully")
        )

})

const deleteCoupon = asyncHandler(async (req, res) => {
    const couponId = req.params.couponId

    const coupon = await Coupon.findByIdAndDelete(couponId)

    if (!coupon) {
        throw new APIError(404, "Coupon does not exists")
    }

    return res
        .status(200)
        .json(
            new APIResponse(200, {}, "Coupon Delete Successfully")
        )

})

const applyCoupon = asyncHandler(async (req, res) => {
    // -> get coupon
    // -> check if coupon is valid and is exist or not
    // -> if everything is ok than update cart document (set coupon into cart )
    const { couponCode } = req.body

    if (!couponCode) {
        throw new APIError(400, "Coupon code is required")
    }

    const coupon = await Coupon.findOne({
        couponCode,
        isActive: true,
        expiryTime: {
            $gt: Date.now()
        }
    })

    if (!coupon) {
        throw new APIError(400, "Coupon code is invalid or expired")
    }

    const cart = await getCart(req.user._id)

    if (cart.cartTotal < coupon.minCartValue) {
        throw new APIError(
            400, "Coupon is not apply. Because cart total must have minimum " + coupon.minCartValue +
            "rs. But your cart has only " + cart.cartTotal + "rs."
        )
    }

    await Cart.findOneAndUpdate(
        { user: req.user._id },
        {
            $set: {
                coupon: coupon._id
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, cart, "Coupon Apply Successfully")
        )
})


export {
    createCoupon,
    getCopuns,
    updateCoupon,
    deleteCoupon,
    applyCoupon
}
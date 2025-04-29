import { Router } from "express"
import {
    createCoupon,
    getCopuns,
    updateCoupon,
    deleteCoupon
} from "../controllers/coupon.controller.js"
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js"
import {
    createCouponValidator,
    updateCouponValidator
} from "../validators/coupon/coupon.validators.js"
import { validate } from "../validators/validate.js"
import { userRole } from "../constant.js"

const router = Router()

router.route("/")
    .get(verifyJWT, verifyPermisson(userRole.ADMIN), getCopuns)
    .post(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        createCouponValidator(),
        validate,
        createCoupon
    )
router.route("/:couponId")
    .patch(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        updateCouponValidator(),
        validate,
        updateCoupon
    )
    .delete(verifyJWT, verifyPermisson(userRole.ADMIN), deleteCoupon)

export default router
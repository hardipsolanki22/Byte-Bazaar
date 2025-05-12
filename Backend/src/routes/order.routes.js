import { Router } from "express";
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getMyOrdres,
    getOrdersByAdmin,
    updateOrderStatusAndIsPaymentDone,
    verifyStripePayment,
} from "../controllers/order.controller.js";
import {
    createOrderValidator,
    updateOrderStatusAndIsPaymentDoneValidator
} from "../validators/order/order.validators.js";
import { validate } from "../validators/validate.js";
import { userRole } from "../constant.js";

const router = Router()

router.route("/").get(verifyJWT, verifyPermisson(userRole.ADMIN), getOrdersByAdmin)

router.route("/:orderId")
    .patch(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        updateOrderStatusAndIsPaymentDoneValidator(),
        validate,
        updateOrderStatusAndIsPaymentDone
    )

router.route("/my-orders").get(verifyJWT, getMyOrdres)

router.route("/:addressId")
    .post(verifyJWT, createOrderValidator(), validate, createOrder)

router.route("/stripe-payment-verify").get(verifyJWT, verifyStripePayment)




export default router
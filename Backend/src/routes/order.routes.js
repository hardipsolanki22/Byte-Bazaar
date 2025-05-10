import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";
import { createOrderValidator } from "../validators/order/order.validators.js";
import { validate } from "../validators/validate.js";

const router = Router()

router.route("/:addressId")
    .post(verifyJWT, createOrderValidator() ,validate,createOrder)


export default router
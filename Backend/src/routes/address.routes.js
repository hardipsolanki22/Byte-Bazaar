import { Router } from 'express';
import {
    createAddress,
    deleteAddress,
    getAddress,
    updateAddress
} from "../controllers/address.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createAddressValidator, UpdateAddressValidator } from '../validators/address/address.validators.js';
import { validate } from "../validators/validate.js"

const router = Router()

router.route("/")
    .post(verifyJWT, createAddressValidator(), validate, createAddress)
    .get(verifyJWT, getAddress)

router.route("/:addressId")
    .get(verifyJWT, getAddress)
    .patch(verifyJWT, UpdateAddressValidator(), validate, updateAddress)
    .delete(verifyJWT, deleteAddress)


export default router
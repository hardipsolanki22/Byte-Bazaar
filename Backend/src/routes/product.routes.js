import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js";
import { userRole } from "../constant.js";


const router = Router()

router.route("/")
    .post(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
    //     upload.any([
    //     {}
    // ]), 
    createProduct
)

export default router
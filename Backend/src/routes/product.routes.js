import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, getProductsByCategory, searchProduct, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js";
import { userRole } from "../constant.js";


const router = Router()

router.route("/")
    .post(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        upload.fields([
            {
                name: "mainImage",
                maxCount: 1
            },
            {
                name: "subImages",
                maxCount: 4
            }
        ]),
        createProduct
    )
    .get(verifyJWT, getAllProducts)

router.route("/search")
    .get(verifyJWT, searchProduct)

router.route("/:productId")
    .get(verifyJWT, getProduct)
    .patch(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        upload.fields([
            {
                name: "mainImage",
                maxCount: 1
            },
            {
                name: "subImages",
                maxCount: 4
            }
        ]),
        updateProduct
    )
    .delete(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        deleteProduct
    )

router.route("/category/:categoryId")
    .get(verifyJWT, getProductsByCategory)



export default router
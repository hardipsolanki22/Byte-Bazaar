import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    getProductsByCategory,
    searchProduct,
    updateProduct
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js";
import { userRole } from "../constant.js";
import {
    createProductValidator,
    updateProductValidator
} from "../validators/product/product.validators.js";
import { validate } from "../validators/validate.js";


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
        createProductValidator(),
        validate,
        createProduct
    )
    .get(getAllProducts)

router.route("/search")
    .get(searchProduct)

router.route("/:slug")
    .get(getProduct)
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
        updateProductValidator(),
        validate,
        updateProduct
    )
    .delete(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        deleteProduct
    )

router.route("/category/:slug")
    .get(getProductsByCategory)



export default router
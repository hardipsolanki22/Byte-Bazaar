import { Router } from "express"
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js"
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory
} from "../controllers/category.controller.js"
import { userRole } from "../constant.js"

const router = Router()

router.route("/")
    .get(getAllCategories)
    .post(verifyJWT, verifyPermisson(userRole.ADMIN), createCategory)
router.route("/:slug")
    .get(verifyJWT, getCategory)
    .patch(verifyJWT, verifyPermisson(userRole.ADMIN), updateCategory)
    .delete(verifyJWT, verifyPermisson(userRole.ADMIN), deleteCategory)


export default router
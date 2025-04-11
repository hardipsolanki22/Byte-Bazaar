import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory
} from "../controllers/category.controller.js"

const router = Router()

router.route("/")
    .get(verifyJWT, getAllCategories)
    .post(verifyJWT, createCategory)
router.route("/:categoryId")
    .get(verifyJWT, getCategory)
    .patch(verifyJWT, updateCategory)
    .delete(verifyJWT, deleteCategory)


export default router
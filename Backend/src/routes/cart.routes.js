import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addItemOrUpdateItemQuantity, clearCart, getUserCart, removeItem } from "../controllers/cart.controller.js"

const router = Router()


router.route("/")
    .get(verifyJWT, getUserCart)
router.route("/products/:productId")
    .post(verifyJWT, addItemOrUpdateItemQuantity)
    .patch(verifyJWT, removeItem)
router.route("/clear")
    .patch(verifyJWT, clearCart)



export default router
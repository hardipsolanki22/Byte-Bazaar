import { Router } from "express"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

// unsecure routes
router.route("/register").post(upload.single("avatar"), registerUser)
router.route("/login").post(loginUser)

// secure routes
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)


export default router
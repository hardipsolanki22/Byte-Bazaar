import { Router } from "express"
import {
    forgotPasswordRequestValidator,
    loginValidator,
    registerValidator,
    updateUserDetailsValidator,
} from "../validators/user/user.validators.js"
import {
    changePassword,
    forgotPassword,
    forgotPasswordRequest,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    resentEmailVerification,
    updateAvatar,
    updateUserDetails,
    userProfile,
    verifyEmail
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { validate } from "../validators/validate.js"


const router = Router()

// unsecure routes
router.route("/register").post(
    upload.single("avatar"),
    registerValidator(),
    validate,
    registerUser
)
router.route("/login").post(loginValidator(), validate, loginUser)
router.route("/refresh-access-token").patch(refreshAccessToken)
router.route("/forgot-password").patch(
    forgotPasswordRequestValidator(),
    validate,
    forgotPasswordRequest
)
router.route("/forgot-password/:forgotPasswordToken").patch(forgotPassword)

// secure routes
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/verify-email/:verificationToken").patch(verifyJWT, verifyEmail)
router.route("/resent-email-verification").patch(verifyJWT, resentEmailVerification)
router.route("/change-password").patch(verifyJWT, changePassword)
router.route("/update-details").patch(
    verifyJWT, updateUserDetailsValidator(), validate, updateUserDetails
)
router.route("/update-avatar").patch(
    upload.single("avatar"),
    verifyJWT,
    updateAvatar
)
router.route('/:userId').get(verifyJWT, validate, userProfile)


export default router
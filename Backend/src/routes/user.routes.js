import { Router } from "express"
import {
    assignUserRoleValidator,
    forgotPasswordRequestValidator,
    loginValidator,
    registerValidator,
    updateUserDetailsValidator,
} from "../validators/user/user.validators.js"
import {
    assignRole,
    changePassword,
    forgotPassword,
    forgotPasswordRequest,
    getCurrentUser,
    getUsersListsByAdmin,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    resentEmailVerification,
    socialLogin,
    updateAvatar,
    updateUserDetails,
    userProfile,
    verifyEmail
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT, verifyPermisson } from "../middlewares/auth.middleware.js"
import { validate } from "../validators/validate.js"
import passport from "passport"
import { userRole } from "../constant.js"


const router = Router()

// unsecure routes
router.route("/register").post(
    upload.single("avatar"),
    registerValidator(),
    validate,
    registerUser
)

router.route("/verify-email/:verificationToken").patch(verifyEmail)
router.route("/resent-email-verification").patch(resentEmailVerification)

router.route("/google").get(
    passport.authenticate("google", { scope: ["email"] }),
)
router.route("/facebook").get(
    passport.authenticate("facebook", { scope: ["email"] })
)
router.route("/google/callback").get(passport.authenticate("google"), socialLogin)
router.route("/facebook/callback").get(passport.authenticate("facebook", socialLogin))


router.route("/login").post(loginValidator(), validate, loginUser)
router.route("/refresh-access-token").patch(refreshAccessToken)
router.route("/forgot-password").patch(
    forgotPasswordRequestValidator(),
    validate,
    forgotPasswordRequest
)
router.route("/forgot-password/:forgotPasswordToken").patch(forgotPassword)

// admin routes
router.route("/list").get(
    verifyJWT,
    verifyPermisson(userRole.ADMIN),
    getUsersListsByAdmin
)
router.route("/assign-role/:userId").patch(
    verifyJWT,
    verifyPermisson(userRole.ADMIN),
    assignUserRoleValidator(),
    validate,
    assignRole
)

// secure routes
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/logout").post(verifyJWT, logoutUser)

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
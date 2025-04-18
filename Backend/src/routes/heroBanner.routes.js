import { Router } from 'express'
import { verifyJWT, verifyPermisson } from '../middlewares/auth.middleware.js'
import { userRole } from '../constant.js'
import {
    createHeroBanners,
    deleteHeroBanner,
    getHeroBanners,
    updateHeroBanners
} from '../controllers/hiroBanner.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/")
    .get(getHeroBanners)
    .post(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        upload.single("heroBanners"),
        createHeroBanners
    )
router.route("/:id")
    .put(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        upload.single("heroBanners"),
        updateHeroBanners
    )
    .delete(
        verifyJWT,
        verifyPermisson(userRole.ADMIN),
        deleteHeroBanner
    )

export default router
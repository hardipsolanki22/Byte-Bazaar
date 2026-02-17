import { Router } from "express";
import { createRating, deleteRating, getAllRating, updateRating } from "../controllers/rating.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createRatingValidator, updateRatingValidator } from "../validators/rating/rating.validators.js";
import { validate } from "../validators/validate.js";


const router = Router();

router.route("/products/:slug")
    .get(getAllRating)
    .post(verifyJWT,
        createRatingValidator(),
        validate,
        createRating
    )
router.route("/:ratingId")
    .patch(verifyJWT,
        updateRatingValidator(),
        validate,
        updateRating
    )
    .delete(verifyJWT, deleteRating)

export default router

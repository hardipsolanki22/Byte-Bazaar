import { Router } from "express";
import { createRating, deleteRating, getAllRating, updateRating } from "../controllers/rating.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/products/:productId")
    .get(getAllRating)
    .post(verifyJWT, createRating)
router.route("/:ratingId")
    .patch(verifyJWT, updateRating)
    .delete(verifyJWT, deleteRating)

export default router

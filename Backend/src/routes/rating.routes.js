import { Router } from "express";
import { createRating, deleteRating } from "../controllers/rating.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/")
    .post(verifyJWT, createRating)
    .delete(verifyJWT, deleteRating)

export default router

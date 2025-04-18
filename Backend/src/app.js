import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to the Byte Bazaar Backend");
})

// routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/product.routes.js"
import ratingRouter from "./routes/rating.routes.js"
import addressRouter from "./routes/address.routes.js"
import heroBannerRouter from "./routes/heroBanner.routes.js"

// APIs
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/rating", ratingRouter)
app.use("/api/v1/address", addressRouter)
app.use("/api/v1/hero-banners", heroBannerRouter)


// error handler
app.use(errorHandler)

export { app }



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session"
import passport from "passport"
import { errorHandler } from "./middlewares/error.middleware.js";
import "./passport/index.js"

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
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}))
app.use(passport.initialize())
app.use(passport.session())



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
import cartRouter from "./routes/cart.routes.js"
import couponRouter from "./routes/coupon.routes.js"

// APIs
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/rating", ratingRouter)
app.use("/api/v1/address", addressRouter)
app.use("/api/v1/hero-banners", heroBannerRouter)
app.use("/api/v1/coupon", couponRouter)
app.use("/api/v1/cart", cartRouter)



// error handler
app.use(errorHandler)

export { app }



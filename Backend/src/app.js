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
    res.send("Welcome to the Byte Bazaar API");
})

// routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/user.routes.js"
// APIs
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users",userRoutes)


// error handler
app.use(errorHandler)

export { app }



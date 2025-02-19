import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from './app.js'

dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Application is running on PORT ${process.env.PORT}`);
        });
        app.on('error', (error) => {
            console.log(`Error: ${error.message}`);
        })
    })
    .catch((error) => {
        console.log(`Error While Connected MongoDB...!: ${error.message}`);
    });
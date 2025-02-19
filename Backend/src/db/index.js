import mongoose from "mongoose";
import { DB_NAME } from '../constant.js'

const connectDB = async () => {
    try {
        const conntection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connetction Successfully...`);
        console.log(`MongoDB connected: ${conntection.connection.host}`);
    } catch (error) {
        console.log("Database Connectio Failed...!", error);
        process.exit(1);
    }
};

export { connectDB }
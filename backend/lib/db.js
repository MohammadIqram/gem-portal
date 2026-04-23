import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log('database connected');
    } catch (error) {
        console.log("could not connect to database: ", error.message);
        process.exit(1);
    }
}
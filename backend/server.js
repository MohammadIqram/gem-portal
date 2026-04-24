import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";

// routes
import authRoutes from "./routes/auth.route.js";
import accountRoutes from "./routes/account.route.js";
import contactRoutes from "./routes/support.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

// Debug and Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "server is up and running."
    });
});

// define rotues
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/contact", contactRoutes);

// connect DB
app.listen(PORT, () => {
    console.log('server running on port: ', PORT);
    connectDB();
})
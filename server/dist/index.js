import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import onboard from "./routes/onboard.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookie from "cookie-parser";
dotenv.config();
const app = express();
app.use(cookie());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "*",
    credentials: true,
}));
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", onboard);
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
const Port = process.env.PORT;
server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

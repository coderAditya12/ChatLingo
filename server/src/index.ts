import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
interface customError extends Error {
  statusCode?: number;
}
app.use((err: customError, req: Request, res: Response, next: NextFunction) => {
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

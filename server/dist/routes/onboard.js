import express from "express";
import onboardController from "../controller/onboard.js";
import { verifyToken } from "../middleware/verify.js";
const router = express.Router();
router.post("/onboard/:userId", verifyToken, onboardController);
export default router;

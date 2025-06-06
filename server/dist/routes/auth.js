import express from "express";
import { googleAuth, signIn, signOut, signUp } from "../controller/auth.js";
import { verifyToken } from "../middleware/verify.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.post("/googleauth", googleAuth);
// Fixed route handler with proper typing
router.get("/verify", verifyToken, (req, res, next) => {
    try {
        res.status(200).json({ valid: true, user: req.user });
    }
    catch (error) {
        next(error);
    }
});
export default router;

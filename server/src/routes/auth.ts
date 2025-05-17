import express, { Response, Router, NextFunction } from "express";
import { signIn, signOut, signUp } from "../controller/auth.js";
import { CustomRequest, verifyToken } from "../middleware/verify.js";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

// Fixed route handler with proper typing
router.get(
  "/verify",
  verifyToken,
  (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
      res.status(200).json({ valid: true, user: req.user });
    } catch (error) {
      next(error);
    } 
  }
);

export default router;

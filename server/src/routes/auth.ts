import express, { Response, Router } from "express";
import { signIn, signOut, signUp } from "../controller/auth.js";
import { CustomRequest, verifyToken } from "../middleware/verify.js";
const router: Router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/verify", verifyToken, (req: CustomRequest, res: Response) => {
  res.status(200).json({ valid: true });
  // No return statement
});
export default router;

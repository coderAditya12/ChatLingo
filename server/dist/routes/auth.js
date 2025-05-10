//sign up
//sign in
//sign out
import express from "express";
import { signIn, signOut, signUp } from "../controller/auth.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
export default router;

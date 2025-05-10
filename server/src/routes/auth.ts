//sign up
//sign in
//sign out
import express, { Router } from "express";
import { signIn, signOut, signUp } from "../controller/auth.js";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
export default router;

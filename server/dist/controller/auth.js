var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../utilis/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { clerkId, email, fullName, imageUrl } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                clerkId: clerkId,
            },
        });
        if (existingUser) {
            const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res
                .cookie("authToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            })
                .json({
                message: "User already exists",
                user: existingUser,
            });
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = yield bcrypt.hash(generatedPassword, 12);
            const newUser = yield prisma.user.create({
                data: {
                    clerkId,
                    email,
                    fullname: fullName,
                    password: hashedPassword,
                },
            });
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res
                .cookie("authToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            })
                .json({
                message: "User created successfully",
                user: newUser,
            });
        }
    }
    catch (error) {
        console.log("error", error);
    }
});
export const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("sign in");
});
export const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("sign out");
});

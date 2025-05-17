var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { prisma } from "../utilis/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorHandler from "../middleware/error.js";
// 🔐 Helper function to create tokens and set cookies
const loginResponse = (user, res) => {
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    const accesstoken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });
    res.cookie("accesstoken", accesstoken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(Date.now() + 60 * 1000), // 1 minute
    });
    res.status(201).json({
        message: "User logged in successfully",
        user: userWithoutPassword,
    });
};
// 🚀 Sign Up
export const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return errorHandler(res, 409, "User already exists");
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email,
                fullname: fullName,
                password: hashedPassword,
            },
        });
        loginResponse(newUser, res);
    }
    catch (error) {
        next(error);
    }
});
// 🔐 Sign In
export const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return errorHandler(res, 404, "User not found");
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return errorHandler(res, 401, "Invalid password");
        }
        loginResponse(user, res);
    }
    catch (error) {
        next(error);
    }
});
// 🔓 Google Auth
export const googleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        let user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = yield bcrypt.hash(generatedPassword, 10);
            user = yield prisma.user.create({
                data: {
                    email,
                    fullname: name,
                    password: hashedPassword,
                },
            });
        }
        loginResponse(user, res);
    }
    catch (error) {
        next(error);
    }
});
// 🚪 Sign Out
export const signOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshtoken");
    res.clearCookie("accesstoken");
    res.json({ message: "User signed out successfully" });
});

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
export const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Add type annotation to destructured values
    const { email, fullName, password } = req.body;
    try {
        //user finding
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return errorHandler(res, 409, "User already exists");
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        //user creation
        const newUser = yield prisma.user.create({
            data: {
                email,
                fullname: fullName,
                password: hashedPassword,
            },
        });
        //token generation
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res
            .status(201)
            .cookie("access-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })
            .json({
            message: "User created successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
});
export const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!existingUser) {
            return errorHandler(res, 404, "User not found");
        }
        const isPasswordValid = yield bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return errorHandler(res, 401, "Invalid password");
        }
        const { password: _ } = existingUser, userWithoutPassword = __rest(existingUser, ["password"]);
        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log(token);
        res
            .status(201)
            .cookie("access-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })
            .json({
            message: "User created successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
});
export const signOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie("access-token")
        .json({ message: "User signed out successfully" });
});

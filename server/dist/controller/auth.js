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
import bcrypt from "bcrypt";
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, fullName, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email,
                fullname: fullName,
                password: hashedPassword,
            },
        });
        res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
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

import { Request, Response, NextFunction } from "express";
import { prisma } from "../utilis/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorHandler from "../middleware/error.js";
import { CustomRequest } from "../middleware/verify.js";

// Interfaces
interface UserInput {
  email: string;
  fullName: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  fullname: string;
  password: string;
}

// 🔐 Helper function to create tokens and set cookies
const loginResponse = (user: User, res: Response) => {
  const { password: _, ...userWithoutPassword } = user;

  const accesstoken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "1d" }
  );

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
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, fullName, password }: UserInput = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return errorHandler(res, 409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        fullname: fullName,
        password: hashedPassword,
      },
    });

    loginResponse(newUser, res);
  } catch (error) {
    next(error);
  }
};

// 🔐 Sign In
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorHandler(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorHandler(res, 401, "Invalid password");
    }

    loginResponse(user, res);
  } catch (error) {
    next(error);
  }
};

// 🔓 Google Auth
export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      user = await prisma.user.create({
        data: {
          email,
          fullname: name,
          password: hashedPassword,
        },
      });
    }

    loginResponse(user, res);
  } catch (error) {
    next(error);
  }
};

// 🚪 Sign Out
export const signOut = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("refreshtoken");
  res.clearCookie("accesstoken");
  res.json({ message: "User signed out successfully" });
};

import { NextFunction, Request, Response } from "express";
import { prisma } from "../utilis/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorHandler from "../middleware/error.js";

// Add interfaces for your types
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
  // Add any other fields your User model has
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add type annotation to destructured values
  const { email, fullName, password }: UserInput = req.body;
  try {
    //user finding
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return errorHandler(res, 409, "User already exists");
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    //user creation
    const newUser: User = await prisma.user.create({
      data: {
        email,
        fullname: fullName,
        password: hashedPassword,
      },
    });
    //token generation
    const { password: _, ...userWithoutPassword } = newUser;
    const token: string = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
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
  } catch (error) {
    next(error);
  }
};
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      return errorHandler(res, 404, "User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return errorHandler(res, 401, "Invalid password");
    }
    const { password: _, ...userWithoutPassword } = existingUser;
    const token: string = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
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
  } catch (error) {
    next(error);
  }
};
export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .clearCookie("access-token")
    .json({ message: "User signed out successfully" });
};

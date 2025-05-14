import { Request, Response } from "express";
import { prisma } from "../utilis/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  console.log(req.body);
  const { clerkId, email, fullName, imageUrl } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
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
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 12);
      const newUser = await prisma.user.create({
        data: {
          clerkId,
          email,
          fullname: fullName,
          password: hashedPassword,
         
        },
      });
      const token = jwt.sign(
        { id: newUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
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
  } catch (error) {
    console.log("error",error);
  }
};
export const signIn = async (req: Request, res: Response) => {
  res.json("sign in");
};
export const signOut = async (req: Request, res: Response) => {
  res.json("sign out");
};

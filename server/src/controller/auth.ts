import { Request, Response } from "express";
import { prisma } from "../utilis/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, fullName, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        fullname: fullName,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log("error", error);
  }
};
export const signIn = async (req: Request, res: Response) => {
  res.json("sign in");
};
export const signOut = async (req: Request, res: Response) => {
  res.json("sign out");
};

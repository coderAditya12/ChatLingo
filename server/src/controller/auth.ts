import { Request, Response } from "express";

export const signUp = async (req: Request, res: Response) => {
  res.json("sign up");
};
export const signIn = async (req: Request, res: Response) => {
  res.json("sign in");
};
export const signOut = async (req: Request, res: Response) => {
  res.json("sign out");
};

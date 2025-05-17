import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  user?: any;
}

// Utility to create access token
const createAccessToken = (user: any) => {
  return jwt.sign(user, process.env.JWT_SECRET as string,);
};

// Utility to create refresh token
const createRefreshToken = (user: any) => {
  return jwt.sign(user, process.env.JWT_SECRET as string,);
};

// Middleware to verify access token and refresh if needed
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accesstoken;
  console.log("Token: ", token);

  if (!token) {
    // If no access token, try to renew using refresh token
    return renewToken(req, res, next);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) {
        // If token is invalid or expired, try refresh token
        return renewToken(req, res, next);
      }

      req.user = user;
      next(); // All good, move on
    }
  );
};

// Function to renew access token using refresh token
const renewToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshtoken;
  console.log("Refresh Token: ", refreshToken);

  if (!refreshToken) {
    return res
      .status(401)
      .json({ valid: false, message: "No refresh token provided" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err || !user) {
        return res
          .status(403)
          .json({ valid: false, message: "Invalid refresh token" });
      }

      // Create new access token
      const newAccessToken = createAccessToken(user);

      // Send new access token in cookie (or send in JSON if you prefer)
      res.cookie("accesstoken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 1000, // 15 minutes
      });

      req.user = user;
      next(); // continue to next route
    }
  );
};


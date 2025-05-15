import jwt, { JsonWebTokenError, JwtPayload, VerifyErrors } from "jsonwebtoken";
import errorHandler from "./error.js";
import { NextFunction, Request, Response } from "express";
interface CustomRequest extends Request {
  user?: any;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    // Just call the error handler and RETURN - don't call next()
    return errorHandler(res, 401, "Unauthorized, no token provided");
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) {
        // Just call the error handler and RETURN - don't call next()
        return errorHandler(res, 401, "Unauthorized, invalid token");
      }
      req.user = user;

      next();
    }
  );
};

export default verifyToken;

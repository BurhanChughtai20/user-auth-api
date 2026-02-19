import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.service";
import User from "../model/user.model";
import { AppError } from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized: No token provided", 401));
    }

    const token = header.split(" ")[1];
    const decoded = verifyToken(token) as any;

    if (!decoded || !decoded.userId) {
      return next(new AppError("Invalid or expired token", 401));
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError("Authentication failed", 401));
  }
};

export default authMiddleware;
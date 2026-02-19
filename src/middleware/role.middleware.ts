import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/ApiError";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return next(new AppError("Unauthorized", 401));

    if (!roles.includes(user.role)) {
      return next(new AppError("Forbidden: Insufficient permissions", 403));
    }

    next();
  };
};

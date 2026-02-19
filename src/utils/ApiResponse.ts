import { Request, Response, NextFunction } from "express";
import { AppError } from "./ApiError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : "Internal Server Error";
  const details = err instanceof AppError ? err.details : undefined;

  console.error(`[ERROR] ${req.method} ${req.url} - ${message}`, err.stack || err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
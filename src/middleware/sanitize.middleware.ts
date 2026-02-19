import { Request, Response, NextFunction } from "express";
import { processUserInput } from "../utils/userTransform";

const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = processUserInput(req.body);
  next();
};

export default sanitizeMiddleware;

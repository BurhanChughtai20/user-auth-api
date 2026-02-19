import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { name, email, isVerified, role } = req.user;

  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: {
      name,
      email,
      isVerified,
      role
    },
  });
};

export const getAdminDashboard = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { name, email, isVerified, role } = req.user;

  return res.status(200).json({
    success: true,
    message: "Admin dashboard data fetched successfully",
    data: {
      name,
      email,
      isVerified,
      role
    },
  });
};
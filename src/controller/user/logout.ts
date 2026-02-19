import { Response, NextFunction } from "express";
import User from "../../model/user.model";
import { AppError } from "../../utils/ApiError";
import { AuthRequest } from "../../middleware/auth.middleware";

const Logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      return next(new AppError("User not found in request", 401));
    }
    await User.findByIdAndUpdate(req.user._id, { 
      $set: { token: null } 
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful. Token removed.",
    });
  } catch (error: any) {
    console.error("Logout Error:", error);
    next(new AppError(error.message || "Server error during logout", 500));
  }
};

export default Logout;
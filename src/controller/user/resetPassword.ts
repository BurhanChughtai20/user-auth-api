import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../../services/hashedPassword.service";
import { findUserByEmail } from "../../services/user.service";
import { AppError } from "../../utils/ApiError";

const ResetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return next(new AppError("Email and new password are required", 400));
    }
    const user = await findUserByEmail(email).select("+isResetVerified");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!user.isResetVerified) {
      return next(new AppError("OTP verification required before resetting password", 403));
    }

    user.password = await hashPassword(password);
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.isResetVerified = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful. You can now login.",
    });
  } catch (err: any) {
    console.error("Reset Password Error:", err);
    next(new AppError(err.message || "Internal Server Error", 500));
  }
};

export default ResetPassword;
import { Request, Response, NextFunction } from "express";
import { findUserByEmail } from "../../services/user.service";
import { AppError } from "../../utils/ApiError";

const VerifyResetOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return next(new AppError("Email and OTP are required", 400));
    }

    const user = await findUserByEmail(email).select("+otp +otpExpiresAt");
    
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (user.otp !== otp) {
      return next(new AppError("Invalid OTP", 400));
    }

    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      return next(new AppError("OTP has expired", 400));
    }
    user.isResetVerified = true;
    
    user.otp = undefined; 
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified. You can now reset your password.",
    });
  } catch (error: any) {
    console.error("Verify Reset OTP Error:", error);
    next(new AppError(error.message || "Internal Server Error", 500));
  }
};

export default VerifyResetOtp;
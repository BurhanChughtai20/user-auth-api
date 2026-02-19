import { Request, Response, NextFunction } from "express";
import { generateOtp } from "../../services/otp.service";
import { sendOtpMail } from "../../services/mail.service";
import { findUserByEmail } from "../../services/user.service";
import { AppError } from "../../utils/ApiError";

const ForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) return next(new AppError("Email is required", 400));

    const user = await findUserByEmail(email);
    
    if (!user) {
      return next(new AppError("No user found with this email", 404));
    }

    const otp = generateOtp();
    
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    user.isResetVerified = false; 
    
    await user.save();

    await sendOtpMail(email, otp);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email",
    });
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    next(new AppError(error.message || "Internal Server Error", 500));
  }
};

export default ForgotPassword;
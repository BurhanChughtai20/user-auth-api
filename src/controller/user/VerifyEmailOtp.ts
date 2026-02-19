import { Request, Response, NextFunction } from "express";
import { signToken } from "../../services/jwt.service";
import { findUserByEmail } from "../../services/user.service"; 
import { AppError } from "../../utils/ApiError";

const VerifyEmailOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) return next(new AppError("Email and OTP are required", 400));

    const user = await findUserByEmail(email).select("otp isVerified name email number role");
    
    if (!user) return next(new AppError("User not found", 404));
    
    if (user.isVerified) return next(new AppError("User already verified", 400));
    
    if (user.otp !== otp) return next(new AppError("Invalid OTP code", 400));

    user.isVerified = true;
    user.otp = undefined;

    const token = signToken({ userId: user._id });
    (user as any).token = token;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        number: user.number,
        isVerified: user.isVerified
      },
    });
  } catch (err: any) {
    next(new AppError(err.message || "Internal Server Error", 500));
  }
};

export default VerifyEmailOtp;
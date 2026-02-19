import { Request, Response, NextFunction } from "express";
import User from "../../model/user.model";
import { hashPassword } from "../../services/hashedPassword.service";
import { sendOtpMail } from "../../services/mail.service";
import { generateOtp } from "../../services/otp.service";
import { ensureEmailNotExists } from "../../services/user.service";
import { AppError } from "../../utils/ApiError";

const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, number, role } = req.body;

    // 1. Normalize email to prevent duplicate registration with different casing
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Strict Check: If this email exists (as admin OR user), stop immediately
    // ensureEmailNotExists throws "User already exists with this email"
    await ensureEmailNotExists(normalizedEmail).catch(err => {
      throw new AppError(err.message, 409); // 409 Conflict
    });

    // 3. Continue with registration only if email is unique
    const hashedPasswordValue = await hashPassword(password);
    const otp = generateOtp();

    const tempUser = await User.create({
      name,
      email: normalizedEmail,
      number,
      password: hashedPasswordValue,
      otp,
      role: role || "user",
    });

    sendOtpMail(normalizedEmail, otp).catch(err => console.error("Mail Error:", err));

    return res.status(201).json({
      success: true,
      message: "OTP sent to email. Verify to complete registration.",
      userId: tempUser._id,
    });

  } catch (err: any) {
    if (err instanceof AppError) return next(err);
    
    if (err.code === 11000) {
      return next(new AppError("Email already registered with another role.", 400));
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val: any) => (val as any).message);
      return next(new AppError(message.join(", "), 400));
    }
    
    next(new AppError(err.message || "Internal Server Error", 500));
  }
};

export default SignUp;
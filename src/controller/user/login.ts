import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../../services/jwt.service";
import { findUserByEmail } from "../../services/user.service"; // New Service
import { AppError } from "../../utils/ApiError";

const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await findUserByEmail(email).select("+password +isVerified");
    
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    if (!user.isVerified) {
      return next(new AppError("Email not verified. Please verify first.", 403));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = signToken({ userId: user._id });
    user.token = token;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
        isVerified: user.isVerified,
        number: user.number,
      },
    });
  } catch (err: any) {
    next(new AppError(err.message || "Internal Server Error", 500));
  }
};

export default Login;
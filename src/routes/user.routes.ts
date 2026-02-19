import { Router } from "express";
import SignUp from "../controller/user/signUp";
import Login from "../controller/user/login";
import VerifyOtp from "../controller/user/VerifyEmailOtp";
import VerifyResetOtp from "../controller/user/verifyResetOtp";
import ResetPassword from "../controller/user/resetPassword";
import ForgotPassword from "../controller/user/forgotPassword";
import Logout from "../controller/user/logout";
import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import sanitizeMiddleware from "../middleware/sanitize.middleware";
import { getAdminDashboard, getUserProfile } from "../controller/profile/profile.controller";

const router = Router();

router.get(
  "/profile", 
  authMiddleware, 
  authorizeRoles("user"), 
  getUserProfile
);

router.get(
  "/admin-dashboard", 
  authMiddleware, 
  authorizeRoles("admin"), 
  getAdminDashboard
);

router.post("/logout", authMiddleware, Logout);

router.use(sanitizeMiddleware);

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/verify-otp", VerifyOtp);
router.post("/forgot-password", ForgotPassword);
router.post("/verify-reset-otp", VerifyResetOtp);
router.post("/reset-password", ResetPassword);

export default router;
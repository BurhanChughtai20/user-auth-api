import { Router } from "express";
import userRoutes from "./user.routes";
import { errorHandler } from "../utils/ApiResponse";

const router = Router();

router.use("/users", userRoutes);
router.get("/test", (req, res) => {
  res.json({ message: "API is running!" });
});
router.use(errorHandler);

export default router;

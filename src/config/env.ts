import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "3000",
  MONGO_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  EMAIL_USER: process.env.EMAIL_USER!,
  EMAIL_PASS: process.env.EMAIL_PASS!,
  EMAIL_APP_NAME: process.env.EMAIL_APP_NAME!,
  API_BASE: process.env.API_BASE || "/api"
};

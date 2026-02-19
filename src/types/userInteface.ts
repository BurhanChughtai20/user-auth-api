export type Role = "user" | "admin";

export interface IUser {
  name: string;
  email: string;
  number: number;
  password: string;
  otp?: string;
  otpExpiresAt?: Date;
  isResetVerified?: boolean;
  token?: string;
  isVerified?: boolean;
  role?: Role;
}

export default IUser;
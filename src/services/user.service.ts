import User from "../model/user.model";

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const ensureEmailNotExists = async (email: string) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists with this email");
  }
};
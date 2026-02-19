  import nodemailer from "nodemailer";
  import { ENV } from "../config/env";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    },
  });

  export const sendOtpMail = async (email: string, otp: string) => {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
        <h2 style="color: #333;">Your OTP Code</h2>
        <p style="font-size: 16px; color: #555;">
          Hello,<br/>
          Use the following One-Time Password (OTP) to complete your action:
        </p>
        <p style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0;">
          ${otp}
        </p>
        <p style="font-size: 14px; color: #888;">
          This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa;">${ENV.EMAIL_APP_NAME} | Do not reply to this email</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${ENV.EMAIL_APP_NAME}" <${ENV.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: htmlContent,
    });
  };

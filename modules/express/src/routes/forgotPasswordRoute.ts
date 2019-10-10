import { Request, Response } from "express";
import { forgotPassword, options } from "@auth-boil/common";

export const forgotPasswordRoute = async (req: Request, res: Response) => {
  try {
    const body = req.body as any;
    const { email, passwordResetToken } = await forgotPassword(body.email);

    const result = await options.processForgotPasswordToken(
      email,
      passwordResetToken
    );
    if (result) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  } catch (err) {
    console.log("error", err);
    return res.sendStatus(500);
  }
};

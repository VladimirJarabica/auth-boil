import { Request, Response } from "express";

import { forgotPassword } from "../common/forgotPassword";
import { options } from "../container";

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

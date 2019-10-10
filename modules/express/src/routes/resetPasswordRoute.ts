import { Request, Response } from "express";
import { resetPassword } from "@auth-boil/common";

export const resetPasswordRoute = async (req: Request, res: Response) => {
  try {
    const body = req.body as any;
    const result = await resetPassword(body.token, body.password);

    if (result) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  } catch (err) {
    return res.sendStatus(500);
  }
};

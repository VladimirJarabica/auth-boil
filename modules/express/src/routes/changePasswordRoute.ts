import { Request, Response } from "express";
import { changePassword } from "@auth-boil/common";

export const changePasswordRoute = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body as any;

    // @ts-ignore
    const result = await changePassword(req.userId, oldPassword, newPassword);

    if (result) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  } catch (err) {
    return res.sendStatus(500);
  }
};

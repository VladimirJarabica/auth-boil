import { Request, Response } from "express";

import { User, register } from "@auth-boil/common";

export const getRegisterRoute = <
  UserType extends Omit<User, "id" | "tokenVersion">
>() => async (req: Request, res: Response) => {
  const success = await register<UserType>(req.body);
  if (success) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
};

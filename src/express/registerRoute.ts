import { Request, Response } from "express";
import { User } from "../container";
import { register } from "../common/register";

export const getRegisterRoute = <UserType extends User>() => async (
  req: Request,
  res: Response
) => {
  const success = await register<UserType>(req.body);
  if (success) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
};

import { Response } from "express";
import { options } from "@auth-boil/common";

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: options.refreshTokenPath
  });
};

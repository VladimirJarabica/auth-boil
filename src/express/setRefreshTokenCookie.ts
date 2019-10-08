import { Response } from "express";

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token"
  });
};

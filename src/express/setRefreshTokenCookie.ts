import { Response } from "express";

import { options } from "../container";

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: options.refreshTokenPath
  });
};

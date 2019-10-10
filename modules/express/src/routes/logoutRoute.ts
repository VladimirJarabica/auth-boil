import { Request, Response } from "express";

import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie";

export const logoutRoute = async (_: Request, res: Response) => {
  setRefreshTokenCookie(res, "");

  return res.sendStatus(200);
};

import { Request, Response } from "express";
import { refreshAccessToken } from "@auth-boil/common";

import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie";

export const refreshTokenRoute = async (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies.jid;

  const result = await refreshAccessToken(oldRefreshToken);

  if (!result.ok) {
    return res.status(401).send(result.reason);
  }

  setRefreshTokenCookie(res, result.refreshToken);

  return res.json({ accessToken: result.accessToken });
};

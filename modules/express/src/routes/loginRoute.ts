import { Request, Response } from "express";
import { login } from "@auth-boil/common";

import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie";

export const loginRoute = async (req: Request, res: Response) => {
  const body = req.body as any;
  const loginResponse = await login(body.email, body.password);

  setRefreshTokenCookie(res, loginResponse.refreshToken);

  return res.json({
    accessToken: loginResponse.accessToken,
    user: loginResponse.user
  });
};

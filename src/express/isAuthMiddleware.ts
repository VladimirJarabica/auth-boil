import { Request, Response, NextFunction } from "express";
import { getUserId } from "../common/getUserId";

export const isAuth = (req: Request, _: Response, next: NextFunction) => {
  const userId = getUserId(req.headers["authorization"]);

  if (!userId) {
    throw new Error("unauthenticated");
  }

  // @ts-ignore
  req.userId = userId;

  return next();
};

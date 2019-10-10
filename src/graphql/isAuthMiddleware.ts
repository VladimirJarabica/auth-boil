import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

import { options } from "../container";

// bearer 102930ajslkdaoq01
export const isAuth = <Context>(
  getHeader: (context: Context, headerName: string) => string | undefined
): MiddlewareFn<Context> => ({ context }, next) => {
  const authorization = getHeader(context, "authorization");

  if (!authorization) {
    throw new Error("authorization not provided");
  }

  try {
    const token = authorization.split(" ")[1];
    const { userId } = verify(token, options.accessTokenSecret) as any;

    // @ts-ignore
    context.userId = userId;
  } catch (err) {
    console.log(err);
    throw new Error("not authorized");
  }

  return next();
};

import { verify } from "jsonwebtoken";

import { UserId, options } from "../container";

export const getUserId = (bearerToken?: string): UserId | null => {
  if (!bearerToken) {
    return null;
  }

  try {
    const token = bearerToken.split(" ")[1];
    const { userId } = verify(token, options.accessTokenSecret) as any;

    return userId;
  } catch (err) {
    return null;
  }
};

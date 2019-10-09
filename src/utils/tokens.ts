import { sign } from "jsonwebtoken";
import { User, options } from "../container";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, options.accessTokenSecret, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    options.refreshTokenSecret,
    {
      expiresIn: "7d"
    }
  );
};

export const createPasswordResetToken = (user: User) => {
  return sign({ userId: user.id }, options.passwordResetSecret, {
    expiresIn: "15min"
  });
};

import { User, options } from "../container";
import { comparePasswords } from "../utils/hashing";
import { createAccessToken, createRefreshToken } from "../utils/tokens";

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
export const login = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await options!.getUserByEmail(email);

  if (!user) {
    throw new Error("user not found");
  }

  if (await comparePasswords(password, user.password)) {
    return {
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
      user
    };
  }
  throw new Error("password does not match");
};

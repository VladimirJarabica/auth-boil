import { User, options } from "../container";
import { comparePasswords } from "../utils/hashing";
import { createAccessToken, createRefreshToken } from "../utils/tokens";

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password" | "tokenVersion">;
};
export const login = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await options.getUserByEmail(email);

  if (!user) {
    throw new Error("user not found");
  }

  if (await comparePasswords(password, user.password)) {
    // Omit password and token version
    const { password, tokenVersion, ...userToSend } = user;
    return {
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
      user: userToSend
    };
  }
  throw new Error("password does not match");
};

import { hashPassword, comparePasswords } from "./utils/hashing";

export { expressLogin } from "./express/expressLogin";

import { Options, options, init, User } from "./container";
import { createAccessToken, createRefreshToken } from "./utils/tokens";

export { hashPassword };

// Generating password

// express middleware

type LoginResult = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
const login = async (email: string, password: string): Promise<LoginResult> => {
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

export const config = (options: Options) => {
  init(options);
};

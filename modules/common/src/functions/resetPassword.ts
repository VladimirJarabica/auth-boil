import { verify } from "jsonwebtoken";

import { options } from "../container";
import { hashPassword } from "../utils/hashing";

export const resetPassword = async (
  token: string,
  password: string
): Promise<boolean> => {
  const { userId } = verify(token, options.passwordResetSecret) as any;
  const user = await options.getUserById(userId);

  if (!user) {
    throw new Error("user not found");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = { ...user, password: hashedPassword };

  return await options.updateUser(user, newUser);
};

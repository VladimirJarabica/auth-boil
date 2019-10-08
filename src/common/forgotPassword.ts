import { options } from "../container";
import { createPasswordResetToken } from "../utils/tokens";

export const forgotPassword = async (
  email: string
): Promise<{ email: string; passwordResetToken: string }> => {
  const user = await options!.getUserByEmail(email);

  if (!user) {
    throw new Error("user not found");
  }

  const passwordResetToken = createPasswordResetToken(user);

  return { email: user.email, passwordResetToken };
};

import { options } from "../container";
import { comparePasswords, hashPassword } from "../utils/hashing";

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await options.getUserById(userId);

  if (await comparePasswords(oldPassword, user.password)) {
    const newUser = { ...user, password: await hashPassword(newPassword) };
    return await options.updateUser(user, newUser);
  }
  return false;
};

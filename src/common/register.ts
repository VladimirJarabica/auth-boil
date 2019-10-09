import { User, options } from "../container";
import { hashPassword } from "../utils/hashing";

export const register = async <FullUser extends User>(user: FullUser) => {
  try {
    const hashedPassword = await hashPassword(user.password);
    await options.addUser({ ...user, password: hashedPassword });
    return true;
  } catch (err) {
    console.log("error", err);
    return false;
  }
};

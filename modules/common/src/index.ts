import { Options, init } from "./container";

// Functions
export { changePassword } from "./functions/changePassword";
export { forgotPassword } from "./functions/forgotPassword";
export { login } from "./functions/login";
export { refreshAccessToken } from "./functions/refreshAccessToken";
export { register } from "./functions/register";
export { resetPassword } from "./functions/resetPassword";

// Utils
export { getUserId } from "./utils/getUserId";
export { hashPassword, comparePasswords } from "./utils/hashing";
export {
  createAccessToken,
  createRefreshToken,
  createPasswordResetToken
} from "./utils/tokens";

export { User, options } from "./container";

export { Options, init };

export const config = (options: Options) => {
  init(options);
};

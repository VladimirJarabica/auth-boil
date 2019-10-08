import { hashPassword } from "./utils/hashing";

export { loginRoute as expressLoginRoute } from "./express/loginRoute";
export {
  getRegisterRoute as getExpressRegisterRoute
} from "./express/registerRoute";

export {
  forgotPasswordRoute as expressForgotPasswordRoute
} from "./express/forgotPasswordRoute";

import { Options, init, User } from "./container";

export { hashPassword, User };

export const config = (options: Options) => {
  init(options);
};

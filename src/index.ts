import { hashPassword } from "./utils/hashing";

import { Options, init, User } from "./container";

export { hashPassword, User };

export const config = (options: Options) => {
  init(options);
};

export type UserId = number | string;

export type User = {
  id: UserId;
  email: string;
  password: string;
  tokenVersion: number;
};

export interface Options {
  getUserById(id: string | number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  addUser(user: Omit<User, "id" | "tokenVersion">): Promise<boolean>;
  updateUser(oldUser: User, newUser: User): Promise<boolean>;
  processForgotPasswordToken(
    email: string,
    forgotPasswordToken: string
  ): Promise<boolean>;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  passwordResetSecret: string;
  refreshTokenPath: string;
}

const DEFAULT_OPTIONS: Options = {
  getUserById: (_: UserId) => Promise.reject(),
  getUserByEmail: (_: string) => Promise.reject(),
  addUser: (_: User) => Promise.reject(),
  updateUser: (_: User, __: User) => Promise.reject(),
  processForgotPasswordToken: (_: string, __string) => Promise.reject(),
  accessTokenSecret: "123",
  refreshTokenSecret: "123",
  passwordResetSecret: "123",
  refreshTokenPath: "/refresh-token"
};

export let options: Options = DEFAULT_OPTIONS;

export const init = (_options: Options) => {
  options = { ...options, ..._options };
};

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
  addUser(user: User): Promise<boolean>;
  processForgotPasswordToken(
    email: string,
    forgotPasswordToken: string
  ): Promise<boolean>;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  passwordResetSecret: string;
}

export let options: Options | null = null;

export const init = (_options: Options) => {
  options = _options;
};

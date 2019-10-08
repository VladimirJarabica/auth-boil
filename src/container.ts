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
  accessTokenSecret: string;
  refreshTokenSecret: string;
}

export let options: Options | null = null;

export const init = (_options: Options) => {
  options = _options;
};

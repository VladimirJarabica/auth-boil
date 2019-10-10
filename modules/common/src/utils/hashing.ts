import { hash, compare } from "bcryptjs";

export const hashPassword = (password: string): Promise<string> =>
  hash(password, 12);

export const comparePasswords = (
  providedPassword: string,
  hashedPassword: string
): Promise<boolean> => compare(providedPassword, hashedPassword);

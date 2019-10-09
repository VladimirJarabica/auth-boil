import { Router } from "express";

import { User } from "../container";
// Routes
import { loginRoute } from "./loginRoute";
import { getRegisterRoute } from "./registerRoute";
import { refreshTokenRoute } from "./refreshTokenRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./changePasswordRoute";
import { logoutRoute } from "./logoutRoute";

interface Options {
  login: string;
  register: string;
  refreshToken: string;
  forgotPassword: string;
  resetPassword: string;
  logout: string;
}

const DEFAULT_OPTIONS: Options = {
  login: "/login",
  register: "/register",
  refreshToken: "/refresh-token",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  logout: "/logout"
};

export const getAuthRouter = <UserType extends User>(
  options: Options = DEFAULT_OPTIONS
) => {
  const router = Router();
  router.post(options.login, loginRoute);
  router.post(options.register, getRegisterRoute<UserType>());
  router.post(options.refreshToken, refreshTokenRoute);
  router.post(options.forgotPassword, forgotPasswordRoute);
  router.post(options.resetPassword, resetPasswordRoute);
  router.post(options.logout, logoutRoute);
  console.log("get auth router", options, router);
  return router;
};

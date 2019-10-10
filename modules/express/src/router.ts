import { Router } from "express";
import { User } from "@auth-boil/common";

// Routes
import { loginRoute } from "./routes/loginRoute";
import { getRegisterRoute } from "./routes/registerRoute";
import { refreshTokenRoute } from "./routes/refreshTokenRoute";
import { forgotPasswordRoute } from "./routes/forgotPasswordRoute";
import { resetPasswordRoute } from "./routes/resetPasswordRoute";
import { changePasswordRoute } from "./routes/changePasswordRoute";
import { logoutRoute } from "./routes/logoutRoute";
import { isAuth } from "./middleware/isAuthMiddleware";

interface Options {
  login: string;
  register: string;
  refreshToken: string;
  forgotPassword: string;
  resetPassword: string;
  changePassword: string;
  logout: string;
}

const DEFAULT_OPTIONS: Options = {
  login: "/login",
  register: "/register",
  refreshToken: "/refresh-token",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  changePassword: "/change-password",
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
  router.post(options.changePassword, isAuth, changePasswordRoute);
  router.post(options.logout, logoutRoute);
  return router;
};

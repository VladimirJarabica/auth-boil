export { getAuthRouter } from "./router";

export { loginRoute } from "./routes/loginRoute";
export { getRegisterRoute } from "./routes/registerRoute";
export { refreshTokenRoute } from "./routes/refreshTokenRoute";
export { forgotPasswordRoute } from "./routes/forgotPasswordRoute";
export { resetPasswordRoute } from "./routes/resetPasswordRoute";
export { changePasswordRoute } from "./routes/changePasswordRoute";
export { logoutRoute } from "./routes/logoutRoute";
export { isAuth } from "./middleware/isAuthMiddleware";
export { setRefreshTokenCookie } from "./utils/setRefreshTokenCookie";

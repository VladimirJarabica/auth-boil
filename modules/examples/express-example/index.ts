import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { User, config, hashPassword } from "@auth-boil/common";
import { getAuthRouter, isAuth } from "@auth-boil/express";

const run = async () => {
  const mockUser = {
    id: "kek",
    email: "kek@kek.kek",
    password: await hashPassword("kek"),
    tokenVersion: 0
  };

  config({
    getUserByEmail: (_: string) => Promise.resolve(mockUser),
    getUserById: (_: string) => Promise.resolve(mockUser),
    async addUser(user: any) {
      console.log("adding", user);
      return true;
    },
    async processForgotPasswordToken(email: string, token: string) {
      console.log("forgot password token ", email, token);
      return true;
    },
    async updateUser(oldUser: User, newUser: User) {
      console.log("user changed", oldUser, newUser);
      return true;
    },
    accessTokenSecret: "123",
    refreshTokenSecret: "321",
    passwordResetSecret: "213",
    refreshTokenPath: "/refresh-token"
  });

  const app = express();

  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use("/", getAuthRouter<User>());

  app.get("/auth", isAuth, (_: Request, res: Response) => {
    res.send("auth route");
  });

  app.get("/", (_, res) => res.json("root"));

  // app.post("/login", expressLoginRoute);

  // app.post("/register", getExpressRegisterRoute<User>());

  // app.post("/forgot-password", forgotPasswordRoute);

  // app.post("/reset-password", resetPasswordRoute);

  // app.post("/logout", logoutRoute);

  const port = 3000;
  app.listen(port, () => {
    console.log("Express server listening on port", port);
  });
};
run();

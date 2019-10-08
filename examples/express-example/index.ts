import express from "express";
import bodyParser from "body-parser";
import {
  User,
  config,
  getExpressRegisterRoute,
  hashPassword,
  expressLoginRoute
} from "../../src";
import { forgotPasswordRoute } from "../../src/express/forgotPasswordRoute";

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
    accessTokenSecret: "123",
    refreshTokenSecret: "321",
    passwordResetSecret: "213"
  });

  const app = express();

  app.use(bodyParser.json());

  app.get("/", (_, res) => res.json("root"));

  app.post("/login", expressLoginRoute);

  app.post("/register", getExpressRegisterRoute<User>());

  app.post("/forgot-password", forgotPasswordRoute);

  const port = 3000;
  app.listen(port, () => {
    console.log("Express server listening on port", port);
  });
};
run();

import express from "express";
import bodyParser from "body-parser";
import { config, hashPassword, expressLogin } from "../../src";

const run = async () => {
  const mockUser = {
    id: "kek",
    email: "kek",
    password: await hashPassword("kek"),
    tokenVersion: 0
  };

  config({
    getUserByEmail: (_: string) => Promise.resolve(mockUser),
    getUserById: (_: string) => Promise.resolve(mockUser),
    accessTokenSecret: "123",
    refreshTokenSecret: "321"
  });

  const app = express();

  app.use(bodyParser.json());

  app.get("/", (_, res) => res.json("root"));

  app.post("/login", expressLogin);

  const port = 3000;
  app.listen(port, () => {
    console.log("Express server listening on port", port);
  });
};
run();

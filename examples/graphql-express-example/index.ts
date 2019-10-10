import "reflect-metadata";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";

import { getAuthResolver } from "../../src/graphql/authResolver";
import { User, UserRegisterInput } from "./User";
import { hashPassword } from "../../src/utils/hashing";
import { config } from "../../src/index";
import { User as UserType } from "../../src/container";
import { setRefreshTokenCookie } from "../../src/express/setRefreshTokenCookie";

const run = async () => {
  const app = express();
  //   app.use(
  //     cors({
  //       origin: "http://localhost:3000",
  //       credentials: true
  //     })
  //   );
  app.use(cookieParser());

  const mockUser: UserType & User = {
    id: "kek",
    email: "kek@kek.kek",
    password: await hashPassword("kek"),
    tokenVersion: 0,
    address: "Moon 123",
    city: "Rover City"
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

  interface Context {
    req: Request;
    res: Response;
  }

  const authResolver = getAuthResolver<Context, User>({
    User,
    UserRegisterInput,
    processRefreshToken(context, refreshToken) {
      setRefreshTokenCookie(context.res, refreshToken);
    },
    getCookie(context, cookieName) {
      return context.req.cookies[cookieName];
    },
    getHeader(context: Context, headerName: string) {
      const header = context.req.headers[headerName];
      return Array.isArray(header) ? header[0] : header;
    }
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [authResolver]
    }),
    context: async ({ req, res }) => ({ req, res }),
    debug: process.env.NODE_ENV !== "production"
  });
  apolloServer.applyMiddleware({ app, cors: false });

  const port = 3000;
  app.listen(port, () => {
    console.log("Express server with graphql listening on port", port);
  });
};

run();

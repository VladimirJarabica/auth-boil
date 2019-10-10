import {
  Query,
  Resolver,
  ClassType,
  Mutation,
  Field,
  ObjectType,
  Arg,
  Ctx,
  UseMiddleware
} from "type-graphql";

import { login } from "../common/login";
import { register } from "../common/register";
import { changePassword } from "../common/changePassword";
import { refreshAccessToken } from "../common/refreshAccessToken";
import { forgotPassword } from "../common/forgotPassword";
import { options } from "../container";
import { resetPassword } from "../common/resetPassword";
import { isAuth } from "./isAuthMiddleware";

export interface IUser {
  id: string | number;
  email: string;
  password: string;
  tokenVersion: number;
}

export interface IRegisterUser {
  email: string;
  password: string;
}

// export interface IAuthResolver {}

interface Params<Context> {
  User: ClassType<IUser>;
  UserRegisterInput: ClassType<IRegisterUser>;
  processRefreshToken: (context: Context, refreshToken: string) => void;
  getCookie: (context: Context, cookieName: string) => string | undefined;
  getHeader: (context: Context, headerName: string) => string | undefined;
}

@ObjectType()
class RefreshTokenResponse {
  @Field()
  ok: boolean;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  reason: string;
}

@ObjectType()
class BasicResponse {
  @Field()
  ok: boolean;

  @Field({ nullable: true })
  reason: string;
}

export const getAuthResolver = <Context, UserType>({
  User,
  UserRegisterInput,
  processRefreshToken,
  getCookie,
  getHeader
}: Params<Context>): Function => {
  @ObjectType()
  class LoginResponse {
    @Field()
    accessToken: string;

    @Field(() => User)
    user: UserType;
  }

  @Resolver()
  class AuthResolver {
    @Query(() => User, { nullable: true })
    async me() {
      return "kek";
    }

    @Mutation(() => LoginResponse)
    async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() context: Context
    ) {
      const loginResponse = await login(email, password);

      processRefreshToken(context, loginResponse.refreshToken);

      return {
        accessToken: loginResponse.accessToken,
        user: loginResponse.user
      };
    }

    @Mutation(() => Boolean)
    async register(@Arg("user", () => UserRegisterInput) user: IRegisterUser) {
      const success = await register<IRegisterUser>(user);
      return success;
    }

    @Mutation(() => RefreshTokenResponse)
    async refreshAccessToken(@Ctx() context: Context) {
      const oldRefreshToken = getCookie(context, "jid");

      const result = await refreshAccessToken(oldRefreshToken);

      if (!result.ok) {
        return { ok: result.ok, reason: result.reason };
      }

      processRefreshToken(context, result.refreshToken);

      return { ok: true, accessToken: result.accessToken };
    }

    @Mutation(() => BasicResponse)
    async forgotPassword(@Arg("email") inputEmail: string) {
      try {
        const { email, passwordResetToken } = await forgotPassword(inputEmail);

        const result = await options.processForgotPasswordToken(
          email,
          passwordResetToken
        );
        if (result) {
          return { ok: true };
        }
        return { ok: false, reason: "processing_failed" };
      } catch (err) {
        console.log("error", err);
        return { ok: false, reason: "internal_error" };
      }
    }

    @Mutation(() => BasicResponse)
    async resetPassword(
      @Arg("token") token: string,
      @Arg("password") password: string
    ) {
      try {
        const result = await resetPassword(token, password);

        if (result) {
          return { ok: true };
        }
        return { ok: false, reason: "processing_failed" };
      } catch (err) {
        console.log("error", err);
        return { ok: false, reason: "internal_error" };
      }
    }

    @Mutation(() => BasicResponse)
    @UseMiddleware(isAuth(getHeader))
    async changePassword(
      @Arg("oldPassword") oldPassword: string,
      @Arg("newPassword") newPassword: string,
      @Ctx() context: Context
    ) {
      const result = await changePassword(
        // @ts-ignores
        context.userId,
        oldPassword,
        newPassword
      );

      if (result) {
        return { ok: true };
      }
      return { ok: false, reason: "changin_password_failed" };
    }

    @Mutation(() => BasicResponse)
    logout(@Ctx() context: Context) {
      processRefreshToken(context, "");
      return { ok: true };
    }
  }

  return AuthResolver;
};

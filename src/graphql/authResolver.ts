import {
  Query,
  Resolver,
  ClassType,
  Mutation,
  Field,
  ObjectType,
  Arg,
  Ctx
} from "type-graphql";

import { login } from "../common/login";
import { register } from "../common/register";
import { refreshAccessToken } from "../common/refreshAccessToken";

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

export const getAuthResolver = <Context, UserType>({
  User,
  UserRegisterInput,
  processRefreshToken,
  getCookie
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
  }

  return AuthResolver;
};

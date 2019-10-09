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
import { User } from "container";
import { register } from "../common/register";

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
}

export const getAuthResolver = <Context, UserType>({
  User,
  UserRegisterInput,
  processRefreshToken
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
  }

  return AuthResolver;
};

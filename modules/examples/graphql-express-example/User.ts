import { ObjectType, Field, InputType } from "type-graphql";
import { IUser, IRegisterUser } from "@auth-boil/graphql";

@ObjectType()
export class User implements IUser {
  @Field()
  id: string;

  @Field()
  email: string;

  password: string;

  tokenVersion: number;

  @Field()
  address: string;

  @Field()
  city: string;
}

@InputType()
export class UserRegisterInput implements IRegisterUser {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  address: string;

  @Field()
  city: string;
}

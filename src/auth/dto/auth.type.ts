import { Field } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  token: string;
}

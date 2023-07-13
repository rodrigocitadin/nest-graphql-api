import { HideField, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'name field cannot be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'email field cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password field cannot be empty' })
  @HideField()
  @IsStrongPassword()
  password: string;
}

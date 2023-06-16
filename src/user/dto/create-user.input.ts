import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'name field cannot be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'email field cannot be empty' })
  email: string;
}

import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'name field cannot be empty' })
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty({ message: 'email field cannot be empty' })
  @IsOptional()
  email?: string;
}

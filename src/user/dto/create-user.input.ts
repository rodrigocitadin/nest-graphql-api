import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'this field is mandatory' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'this field is mandatory' })
  email: string;
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation()
  public async login(
    @Args('data') data: AuthInput
  ): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token,
    }
  }
}

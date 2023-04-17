import { Args, Resolver, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SignUpInput } from '../inputs/sign-up.input';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Auth } from '../models/auth.model';
import { EmailLoginInput } from '../inputs/email-login.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Auth)
  async login(@Args('loginInput') loginInput: EmailLoginInput, @Context() req) {
    console.log(req);
    return await this.authService.login(req.user);
  }

  @Mutation(() => Auth)
  async signup(@Args('signupInput') signupInput: SignUpInput) {
    return await this.authService.signUp(signupInput);
  }
}

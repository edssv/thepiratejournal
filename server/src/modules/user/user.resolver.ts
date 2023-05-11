import { Args, Resolver, Query, Context, Mutation } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Draft } from '../draft/entities/draft.entity';
import { UseGuards } from '@nestjs/common';
import { UpdateProfileInput } from './inputs/update-profile';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: number): Promise<User> {
    return await this.userService.findOne({ id });
  }

  @Query(() => [Draft], { nullable: true })
  async getUserContent(
    @Args('id') id: number,
    @Args('articles') articles: string,
  ) {
    return await this.userService.findContent(id, articles);
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Context() context,
    @Args('updateProfileInput') input: UpdateProfileInput,
  ) {
    return await this.userService.updateProfile(context.req.user.id, input);
  }
}

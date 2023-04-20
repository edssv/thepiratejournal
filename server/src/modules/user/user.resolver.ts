import { Args, Resolver, Query } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Article } from 'src/modules/article/entities/article.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Query(() => [Article], { nullable: true })
  async getUserContent(@Args('id') id: number, @Args('articles') articles: string) {
    return await this.userService.findContent(id, articles);
  }
}

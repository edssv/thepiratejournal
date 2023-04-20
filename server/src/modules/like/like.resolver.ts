import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Resolver('Like')
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ID)
  createLike(@Context() context, @Args('articleId') articleId: number) {
    return this.likeService.create(articleId, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ID)
  removeLike(@Context() context, @Args('articleId') articleId: number) {
    return this.likeService.remove(articleId, context.req.user.id);
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';

import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './inputs/create-article.input';
import { UpdateArticleInput } from './inputs/update-article.input';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async createArticle(
    @Context() context,
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return await this.articleService.create(
      context.req.user,
      createArticleInput,
    );
  }

  @Query(() => [Article])
  async getAllArticle(): Promise<Article[]> {
    return await this.articleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Article])
  async getUserArticles(@Context() context): Promise<Article[]> {
    return await this.articleService.findUserArticles(context.req.user.id);
  }

  @Query(() => Article)
  async getArticle(@Args('id') id: number): Promise<Article> {
    return await this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async updateArticle(
    @Context() context,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return await this.articleService.update(
      context.req.user.id,
      updateArticleInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async removeArticle(@Context() context, @Args('id') id: number) {
    return await this.articleService.remove(id, context.req.user.id);
  }

  @Query(() => [Article])
  async getNextArticles(@Args('id') id: number): Promise<Article[]> {
    return await this.articleService.findNext(id);
  }
}

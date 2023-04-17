import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateArticleInput } from './inputs/create-article.input';
import { UpdateArticleInput } from './inputs/update-article.input';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async createArticle(@Context() context, @Args('createArticleInput') createArticleInput: CreateArticleInput) {
    return await this.articleService.create(context.req.user.id, createArticleInput);
  }

  @Query(() => [Article])
  async getAllArticles() {
    return await this.articleService.findAll();
  }

  @Query(() => Article)
  async getArticle(@Args('id') id: number) {
    return await this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async updateArticle(@Context() context, @Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
    return await this.articleService.update(context.req.user.id, updateArticleInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async removeArticle(@Context() context, @Args('id') id: number) {
    return await this.articleService.remove(context.req.user.id, id);
  }

  @Query(() => [Article])
  async getNextArticles(@Args('id') id: number) {
    return await this.articleService.findNext(id);
  }

  @Query(() => [Article])
  async getAuthorChoiceArticles() {
    return await this.articleService.findAuthorChoice();
  }

  @Query(() => [Article])
  async getBestOfWeekArticles() {
    return await this.articleService.findBestOfWeek();
  }

  @Query(() => [Article])
  getNewestArticles() {
    return this.articleService.findNewest();
  }
}

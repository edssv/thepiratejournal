import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';

import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './inputs/create-blog.input';
import { UpdateBlogInput } from './inputs/update-blog.input';

@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Blog)
  async createBlog(@Context() context, @Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return await this.blogService.create(context.req.user, createBlogInput);
  }

  @Query(() => [Blog])
  async getAllBlog(): Promise<Blog[]> {
    return await this.blogService.findAll();
  }

  @Query(() => Blog)
  async getOneBlog(@Args('id') id: number): Promise<Blog> {
    return await this.blogService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Blog)
  async updateBlog(@Context() context, @Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return await this.blogService.update(context.req.user.id, updateBlogInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Blog)
  async removeBlog(@Context() context, @Args('id') id: number) {
    return await this.blogService.remove(id, context.req.user.id);
  }

  @Query(() => [Blog])
  async getNextBlogs(@Args('id') id: number): Promise<Blog[]> {
    return await this.blogService.findNext(id);
  }
}

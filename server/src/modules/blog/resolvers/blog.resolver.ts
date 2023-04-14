import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { BlogService } from '../blog.service';
import { Blog } from '../entities/blog.entity';
import { CreateBlogInput } from '../inputs/create-blog.input';

@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  // @Mutation(() => Blog)
  // async create(@Args('createBlog') createBlogInput: CreateBlogInput) {
  //   return await this.blogService.create(1, createBlogInput);
  // }

  @Query(() => Blog)
  async getOne(@Args('id') id: number): Promise<Blog> {
    return await this.blogService.findOne(id);
  }
}

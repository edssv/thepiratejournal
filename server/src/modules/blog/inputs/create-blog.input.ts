import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Block, BlogCategory } from '../entities/blog.entity';

@InputType()
export class CreateBlogInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  cover: string;

  //   @Field({ nullable: false })
  //   body: Block[];

  @Field({ nullable: true })
  tags?: string;

  @Field({ nullable: true })
  category?: BlogCategory;

  @Field({ nullable: false })
  readingTime: number;
}

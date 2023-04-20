import { Field, InputType } from '@nestjs/graphql';
import { BlogCategory } from '../entities/blog.entity';
import { InputBlock } from 'src/lib/block.type';
import { IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  cover: string;

  @Field(() => [InputBlock])
  body: InputBlock[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @Field({ nullable: true })
  category?: BlogCategory;

  @Field()
  readingTime: number;

  @Field({ nullable: true })
  draftId?: number;
}

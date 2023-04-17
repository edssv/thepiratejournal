import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { ArticleCategory } from '../entities/article.entity';
import { InputBlock } from 'src/lib/block.type';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  searchTitle: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  cover: string;

  @Field(() => [InputBlock])
  @IsNotEmpty()
  @IsArray()
  body: InputBlock[];

  @Field({ nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(ArticleCategory)
  category: ArticleCategory;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  readingTime: number;

  @Field({ nullable: true })
  @IsNumber()
  draftId?: number;
}

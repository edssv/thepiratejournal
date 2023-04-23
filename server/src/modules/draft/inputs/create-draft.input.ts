import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { InputBlock } from 'src/lib/block.type';
import { ArticleCategory } from 'src/modules/article/entities/article.entity';

@InputType()
export class CreateDraftInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  cover: string;

  @Field(() => [InputBlock], { nullable: true })
  @IsNotEmpty()
  @IsArray()
  body: InputBlock[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEnum(ArticleCategory)
  category: ArticleCategory;
}

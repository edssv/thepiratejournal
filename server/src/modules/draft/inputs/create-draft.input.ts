import { Field, InputType } from '@nestjs/graphql';
import { InputBlock } from 'src/lib/block.type';
import { ArticleCategory } from 'src/modules/article/entities/article.entity';

@InputType()
export class CreateDraftInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  cover: string;

  @Field(() => [InputBlock], { nullable: true })
  body: InputBlock[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  category: ArticleCategory;
}

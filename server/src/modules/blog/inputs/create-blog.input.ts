import { Field, InputType } from '@nestjs/graphql';
import { BlogCategory } from '../entities/blog.entity';
import { InputBlock } from 'src/lib/block.type';

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

  @Field({ nullable: true })
  tags?: string;

  @Field({ nullable: true })
  category?: BlogCategory;

  @Field({ nullable: false })
  readingTime: number;

  @Field()
  draftId: number;
}

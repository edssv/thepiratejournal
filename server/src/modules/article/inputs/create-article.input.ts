import { Field, InputType } from '@nestjs/graphql';
import { InputBlock } from 'src/lib/block.type';

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  cover: string;

  @Field(() => [InputBlock])
  body: InputBlock[];

  @Field({ nullable: true })
  draftId?: number;
}

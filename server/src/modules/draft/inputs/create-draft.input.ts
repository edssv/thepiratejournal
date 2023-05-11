import { Field, InputType } from '@nestjs/graphql';
import { InputBlock } from 'src/lib/block.type';

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
}

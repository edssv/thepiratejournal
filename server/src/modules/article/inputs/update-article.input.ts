import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateArticleInput } from './create-Article.input';

@InputType()
export class UpdateArticleInput extends CreateArticleInput {
  @Field(() => ID)
  id: number;
}

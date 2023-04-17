import { Field, InputType } from '@nestjs/graphql';

import { CreateArticleInput } from './create-article.input';

@InputType()
export class UpdateArticleInput extends CreateArticleInput {
  @Field()
  id: number;
}

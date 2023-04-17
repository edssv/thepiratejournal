import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateBlogInput } from './create-blog.input';

@InputType()
export class UpdateBlogInput extends CreateBlogInput {
  @Field(() => ID)
  id: number;
}

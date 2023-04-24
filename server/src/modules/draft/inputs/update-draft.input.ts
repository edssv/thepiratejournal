import { Field, InputType } from '@nestjs/graphql';
import { CreateDraftInput } from './create-draft.input';

@InputType()
export class UpdateDraftInput extends CreateDraftInput {
  @Field()
  id: number;
}

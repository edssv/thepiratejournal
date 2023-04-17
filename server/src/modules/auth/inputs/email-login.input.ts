import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmailLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

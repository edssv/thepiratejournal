import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  image?: string | null;
}

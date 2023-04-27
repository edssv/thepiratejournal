import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  image: string;

  @Field()
  role: UserRole;
}

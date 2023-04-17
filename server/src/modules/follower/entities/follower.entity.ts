import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
@Entity('followers')
export class Follower {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.following)
  user: User;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.followers)
  followingTo: User;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;
}

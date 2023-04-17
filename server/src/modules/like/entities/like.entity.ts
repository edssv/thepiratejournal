import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';
import { Article } from 'src/modules/article/entities/article.entity';

@ObjectType()
@Entity('likes')
export class Like {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @Field(() => Article)
  @ManyToOne(() => Article, (article) => article.likes)
  article: Article;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;
}

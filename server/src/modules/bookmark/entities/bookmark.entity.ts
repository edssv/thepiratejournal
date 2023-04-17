import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Article } from 'src/modules/article/entities/article.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
@Entity('bookmarks')
export class Bookmark {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @Field(() => Article)
  @ManyToOne(() => Article)
  article: Article;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';
import { Like } from 'src/modules/like/entities/like.entity';
import { Block } from 'src/lib/block.type';

export enum ArticleCategory {
  REVIEWS = 'Обзоры',
  MENTIONS = 'Отзывы',
  SOLUTIONS = 'Прохождения',
}

@ObjectType()
@Entity('articles')
export class Article {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  searchTitle: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  cover: string;

  @Field(() => [Block])
  @Column({ type: 'jsonb', nullable: false })
  body: Block[];

  @Field({ nullable: true })
  @Column({ array: true, nullable: true })
  tags: string;

  @Field()
  @Column({ type: 'enum', enum: ArticleCategory })
  category: ArticleCategory;

  @Field()
  @Column()
  readingTime: number;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Field()
  @Column({ array: true, nullable: true })
  comments: string;

  @Field()
  @Column({ default: 0, name: 'views_count' })
  viewsCount: number;

  @Field(() => [Like])
  @OneToMany(() => Like, (likes) => likes.article)
  likes: Like[];

  @Field()
  @Column({ select: false, default: false, name: 'is_published' })
  isPublished: boolean;

  @Field()
  @Column({ select: false, default: false, name: 'is_deleted' })
  isDeleted: boolean;
}

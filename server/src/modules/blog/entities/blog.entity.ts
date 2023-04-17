import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Block } from 'src/lib/block.type';

export enum BlogCategory {
  REVIEWS = 'Обзоры',
  MENTIONS = 'Отзывы',
  SOLUTIONS = 'Прохождения',
}

@ObjectType()
@Entity('blog')
export class Blog {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  cover: string;

  @Field(() => [Block])
  @Column({ type: 'jsonb' })
  body: Block[];

  @Field({ nullable: true })
  @Column({ array: true, nullable: true })
  tags: string;

  @Field()
  @Column({ type: 'enum', enum: BlogCategory, nullable: true })
  category: BlogCategory;

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
  @Column({ default: 0, name: 'views_count' })
  viewsCount: number;

  @Field()
  @Column({ default: 0, name: 'likes_count' })
  likesCount: number;

  @Field()
  @Column({ select: false, default: false, name: 'is_published' })
  isPublished: boolean;

  @Field({ nullable: true })
  @Column({ select: false, default: false, name: 'is_deleted' })
  isDeleted: boolean;
}

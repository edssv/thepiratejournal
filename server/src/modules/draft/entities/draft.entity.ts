import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleCategory } from 'src/modules/article/entities/article.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Block } from 'src/lib/block.type';

@ObjectType()
@Entity('drafts')
export class Draft {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => [Block], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  body: Block[];

  @Field(() => [String], { nullable: true })
  @Column({ array: true, nullable: true })
  tags: string;

  @Field({ nullable: true })
  @Column({ type: 'enum', enum: ArticleCategory, nullable: true })
  category: ArticleCategory;

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
}

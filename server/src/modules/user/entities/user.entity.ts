import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Article } from 'src/modules/article/entities/article.entity';
import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Draft } from 'src/modules/draft/entities/draft.entity';
import { Follower } from 'src/modules/follower/entities/follower.entity';
import { Like } from 'src/modules/like/entities/like.entity';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}
@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

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
  @Column({ default: false })
  emailVerified: boolean;

  @Field(() => [Follower], { nullable: true })
  @OneToMany(() => Follower, (follower) => follower.user)
  following: Follower[];

  @Field(() => [Follower], { nullable: true })
  @OneToMany(() => Follower, (follower) => follower.followingTo)
  followers: Follower[];

  @Field(() => [Article], { nullable: true })
  @OneToMany(() => Article, (articles) => articles.user)
  articles: Article[];

  @Field(() => [Draft], { nullable: true })
  @OneToMany(() => Draft, (drafts) => drafts.user)
  drafts: Draft[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (likes) => likes.user)
  likes: Like[];

  @Field(() => [Bookmark], { nullable: true })
  @OneToMany(() => Bookmark, (bookmarks) => bookmarks.user)
  bookmarks: Bookmark[];
}

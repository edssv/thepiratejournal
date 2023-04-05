import { Article } from 'src/modules/article/entities/article.entity';
import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Draft } from 'src/modules/draft/entities/draft.entity';
import { Follower } from 'src/modules/follower/entities/follower.entity';
import { Like } from 'src/modules/like/entities/like.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    USER = 'user',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    image: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({ default: false })
    emailVerified: boolean;

    @OneToMany(() => Follower, (follower) => follower.user)
    following: Follower[];

    @OneToMany(() => Follower, (follower) => follower.followingTo)
    followers: Follower[];

    @OneToMany(() => Article, (articles) => articles.user)
    articles: Article[];

    @OneToMany(() => Draft, (drafts) => drafts.user)
    drafts: Draft[];

    @OneToMany(() => Like, (likes) => likes.user)
    likes: Like[];

    @OneToMany(() => Bookmark, (bookmarks) => bookmarks.user)
    bookmarks: Bookmark[];
}

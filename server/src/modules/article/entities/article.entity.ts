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

export enum ArticleCategory {
    REVIEWS = 'Обзоры',
    MENTIONS = 'Отзывы',
    SOLUTIONS = 'Прохождения',
}

export interface Block {
    id: string;
    type: string;
    data: any;
}

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    searchTitle: string;

    @Column()
    description: string;

    @Column()
    cover: string;

    @Column({ type: 'jsonb' })
    body: Block[];

    @Column({ array: true, nullable: true })
    tags: string;

    @Column({ type: 'enum', enum: ArticleCategory })
    category: ArticleCategory;

    @Column()
    readingTime: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({ array: true, nullable: true })
    comments: string;

    @Column({ default: 0, name: 'views_count' })
    viewsCount: number;

    @OneToMany(() => Like, (likes) => likes.article)
    likes: Like[];

    @Column({ select: false, default: false, name: 'is_published' })
    isPublished: boolean;

    @Column({ select: false, default: false, name: 'is_deleted' })
    isDeleted: boolean;
}

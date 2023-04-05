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

export enum BlogCategory {
    REVIEWS = 'Обзоры',
    MENTIONS = 'Отзывы',
    SOLUTIONS = 'Прохождения',
}

export interface Block {
    id: string;
    type: string;
    data: any;
}

@Entity('blog')
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    cover: string;

    @Column({ type: 'jsonb' })
    body: Block[];

    @Column({ array: true, nullable: true })
    tags: string;

    @Column({ type: 'enum', enum: BlogCategory, nullable: true })
    category: BlogCategory;

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

    @Column({ default: 0, name: 'views_count' })
    viewsCount: number;

    @Column({ default: 0, name: 'likes_count' })
    likesCount: number;

    @Column({ select: false, default: false, name: 'is_published' })
    isPublished: boolean;

    @Column({ select: false, default: false, name: 'is_deleted' })
    isDeleted: boolean;
}

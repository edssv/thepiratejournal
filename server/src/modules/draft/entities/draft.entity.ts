import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ArticleCategory, Block } from 'src/modules/article/entities/article.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('drafts')
export class Draft {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    cover: string;

    @Column({ type: 'jsonb', nullable: true })
    body: Block[];

    @Column({ array: true, nullable: true })
    tags: string;

    @Column({ type: 'enum', enum: ArticleCategory, nullable: true })
    category: ArticleCategory;

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
}

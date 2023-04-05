import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Article } from 'src/modules/article/entities/article.entity';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @ManyToOne(() => Article, (article) => article.likes)
    article: Article;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
}

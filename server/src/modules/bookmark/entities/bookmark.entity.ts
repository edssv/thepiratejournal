import { Article } from 'src/modules/article/entities/article.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('bookmarks')
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.bookmarks)
    user: User;

    @ManyToOne(() => Article)
    article: Article;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
}

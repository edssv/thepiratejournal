import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column()
    // searchTitle: string;

    // @Column()
    // description: string;

    // @Column()
    // cover: string;

    // @Column()
    // body: [];

    // @Column()
    // tags: [{ type: String }];

    // @Column()
    // category: {
    //     name: string;
    //     game: string;
    //     key: string;
    // };

    // @Column()
    // readingTime: number;

    // @Column()
    // author: {
    //     _id: { type: ObjectId; required: true };
    //     username: string;
    // };

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

    // @Column()
    // comments: string[];

    @Column({ default: 0, name: 'views_count' })
    viewsCount: number;

    @Column({ default: 0, name: 'likes_count' })
    likesCount: number;

    // @Column()
    // likesUsers: [];

    @Column({ select: false, default: false, name: 'is_published' })
    isPublished: boolean;

    @Column({ select: false, default: false, name: 'is_deleted' })
    isDeleted: boolean;
}

import { User } from 'src/modules/user/entities/user.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('followers')
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.following)
    user: User;

    @ManyToOne(() => User, (user) => user.followers)
    followingTo: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
}

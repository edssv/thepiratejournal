import { User } from './user.interface';

export interface Comment {
    id: string;
    body: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    likesCount: number;
}

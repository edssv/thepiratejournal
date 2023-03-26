import { Notification } from './notification.interface';

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean | null;
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    role: 'user' | 'editor' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    followers: User[];
    following: User[];
    liked: { articleId: string }[];
    appreciated: { articleId: string }[];
    bookmarks: { articleId: string }[];
}

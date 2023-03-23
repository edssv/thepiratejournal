import { Notification } from './notification.interface';

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean | null;
}

export interface User {
    _id: string;
    email: string;
    name: string;
    picture: string;
    password: string;
    emailVerified: boolean;
    role: 'admin' | 'user';
    follow: { userId: string }[];
    followers: { userId: string }[];
    liked: { articleId: string }[];
    appreciated: { articleId: string }[];
    bookmarks: { articleId: string }[];
    notifications: Notification[];
}

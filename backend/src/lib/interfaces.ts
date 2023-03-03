import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface AdminPanelUser extends Document {
    login: string;
    password: string;
}

export interface Article extends Document {
    title: string;
    searchTitle: string;
    description: string;
    cover: string;
    blocks: [];
    tags: [];
    category: { name: string; game: string; key: string };
    readingTime: { type: Number; required: true };
    author: { _id: typeof ObjectId; username: string };
    createdAt: number;
    updatedAt: number;
    comments: [];
    viewsCount: number;
    likesCount: number;
    likesUsers: [];
    isPublished: Boolean;
    isDeleted: Boolean;
}

export interface Comment extends Document {
    body: string;
    userId: typeof ObjectId;
    createdAt: number;
    likesCount: number;
    likesUsers: [];
}

export interface Draft extends Document {
    title: string;
    cover: string;
    blocks: [];
    tags: [];
    category: { name: string; game: string; key: string };
    author: { _id: typeof ObjectId; username: string };
    createdAt: number;
}

export interface Token extends Document {
    user: typeof ObjectId;
    refreshToken: string;
}

export interface User extends Document {
    _id: typeof ObjectId;
    username: string;
    email: string;
    password: string;
    isActivated: Boolean;
    avatar: string;
    activation_link: string;
    follow: [];
    followers: [];
    info: { country: string; city: string };
    appreciated: [];
    bookmarks: [];
    notifications: [
        {
            action_key: string;
            createdAt: number;
            actor: {
                id: typeof ObjectId;
                username: string;
                avatar: string;
            };
        }
    ];
    time: number;
}

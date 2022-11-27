import { api } from './api';
import { Article, Draft } from './article';

export interface User {
    id: string;
    username: string;
    avatar: string;
    timestamp: any;
    info: {
        city: string;
        country: string;
    };
    isActivated: boolean;
}

export interface UserResponse {
    user: User;
    articles: Article[];
    appreciated: Article[];
    drafts: Draft[];
    isOwner: boolean;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, any>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetUserQuery } = userApi;

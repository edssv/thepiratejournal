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
    viewer: { hasSubscription: boolean };
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}`,
                method: 'GET',
            }),
        }),
        follow: builder.mutation<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}/followers`,
                method: 'POST',
            }),
        }),
        unFollow: builder.mutation<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}/followers`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetUserQuery, useFollowMutation, useUnFollowMutation } = userApi;

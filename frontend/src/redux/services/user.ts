import { api } from './api';
import { Article } from './article';

export interface User {
    id: string;
    username: string;
    avatar: string;
}

export interface UserResponse {
    user: User;
    articles: Article[];
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, any>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET',
            }),
        }),

        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
});

export const { useGetUserQuery } = userApi;

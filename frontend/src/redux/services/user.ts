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
    followersCount: number;
}

export interface UserResponse {
    user: User;
    articles: Article[];
    appreciated: Article[];
    bookmarks: Article[];
    drafts: Draft[];
    isOwner: boolean;
    viewer: { hasSubscription: boolean };
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, any>({
            query: (username) => `users/${username}`,
            providesTags: ['User'],
        }),
        follow: builder.mutation<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}/followers`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        unFollow: builder.mutation<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}/followers`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addBookmark: builder.mutation<UserResponse, any>({
            query: (id) => ({
                url: `bookmarks/${id}`,
                method: 'POST',
            }),
        }),
        removeBookmark: builder.mutation<UserResponse, any>({
            query: (id) => ({
                url: `bookmarks/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useFollowMutation,
    useUnFollowMutation,
    useAddBookmarkMutation,
    useRemoveBookmarkMutation,
} = userApi;

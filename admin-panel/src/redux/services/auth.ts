import { api } from './api';

export interface User {
    _id: string;
    username: string;
    avatar: string;
    timestamp: any;
    info: {
        city: string;
        country: string;
    };
    isActivated: boolean;
    followersCount: number;
    notifications: { totalCount: number };
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Articles'],
        }),
        googlelogin: builder.mutation<LoginResponse, { code: string } | { credential: string }>({
            query: (credentials) => ({
                url: 'auth/google',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Articles'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            invalidatesTags: ['Articles'],
        }),
        getCurrentUser: builder.query<{ user: User }, ''>({
            query: () => 'auth',
        }),
    }),
});

export const { useLoginMutation, useGoogleloginMutation, useLogoutMutation, useGetCurrentUserQuery } = authApi;

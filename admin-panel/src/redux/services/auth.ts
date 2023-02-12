import { api } from './api';

export interface LoginResponse {
    user: string;
    token: string;
}

export interface LoginRequest {
    login: string;
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
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            invalidatesTags: ['Articles'],
        }),
        getCurrentUser: builder.query<{ user: string }, ''>({
            query: () => 'auth',
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } = authApi;

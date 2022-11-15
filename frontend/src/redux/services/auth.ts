import { api } from './api';
import { User } from './user';
export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (credentials) => ({
                url: 'signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
        getCurrentUser: builder.query({
            query: () => `getCurrentUser`,
        }),

        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useProtectedMutation,
} = authApi;

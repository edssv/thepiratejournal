import { api } from './api';
import { User } from './user';
export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    firstName: string;
    lastName: string;
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
        checkAuth: builder.query<AuthResponse, any>({
            query: (credentials) => ({
                url: 'refresh',
                method: 'GET',
                body: credentials.refreshToken,
            }),
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
    useCheckAuthQuery,
    useProtectedMutation,
} = authApi;

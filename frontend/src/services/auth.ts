import { api } from './api';
import { User } from './user';
export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    username?: string;
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
            invalidatesTags: ['Articles'],
        }),
        googlelogin: builder.mutation<AuthResponse, { code: string } | { credential: string }>({
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
        getCurrentUser: builder.query({
            query: () => 'getCurrentUser',
        }),
        checkHaveAccountGoogle: builder.query({
            query: () => 'signin/domains/gmail.com/info',
        }),
    }),
});

export const {
    useLoginMutation,
    useGoogleloginMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useCheckHaveAccountGoogleQuery,
} = authApi;

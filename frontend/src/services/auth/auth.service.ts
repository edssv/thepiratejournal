import Cookies from 'js-cookie';

import { api } from '../api';
import { axiosClassic, instance } from '@/api/api.interceptor';
import { getContentType } from '@/api/api.helper';
import { Tokens } from '@/lib/enums/token.enum';
import { AuthResponse, LoginData, SignupData } from '@/store';
import { saveToStorage } from './auth.helper';
import { ApiUrlBuilder } from '@/lib/apiUrlBuilder';
import { User } from '@/interfaces/user.interface';

export interface LoginRequest {
    username?: string;
    email: string;
    password: string;
}

export const AuthService = {
    async login(data: LoginData) {
        const response = await axiosClassic<AuthResponse>({
            url: ApiUrlBuilder.Login,
            method: 'POST',
            data,
        });

        if (response.data.accessToken) await saveToStorage(response.data);

        return response.data;
    },

    async signup(data: SignupData) {
        const response = await axiosClassic<AuthResponse>({
            url: ApiUrlBuilder.Signup,
            method: 'POST',
            data,
        });

        if (response.data.accessToken) await saveToStorage(response.data);

        return response.data;
    },

    async getNewTokens() {
        const refreshToken = Cookies.get(Tokens.REFRESH_TOKEN);

        const response = await instance.post<string, { data: AuthResponse }>(
            process.env.NEXT_PUBLIC_API_URL + ApiUrlBuilder.Refresh,
            { refreshToken },
            { headers: getContentType() }
        );

        if (response.data.accessToken) saveToStorage(response.data);

        return response;
    },

    async getProfile() {
        return instance<User>({
            url: ApiUrlBuilder.Profile,
            method: 'GET',
        });
    },
};

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

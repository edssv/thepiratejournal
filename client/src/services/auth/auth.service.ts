import { AuthResponse, LoginData, SignupData } from '@/store/user/user.interface';
import { getApiUrl } from '@/lib/apiUrlBuilder';
import { User } from '@/interfaces/user.interface';
import { getRefreshToken } from './auth.helper';
import { api } from '../api/api';

export interface LoginRequest {
  username?: string;
  email: string;
  password: string;
}

const refreshToken = getRefreshToken();

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginData>({
      query: (formData: LoginData) => ({
        url: getApiUrl.login(),
        method: 'POST',
        body: formData,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupData>({
      query: (formData: SignupData) => ({
        url: getApiUrl.signup(),
        method: 'POST',
        body: formData,
      }),
    }),
    getNewTokens: builder.query<AuthResponse, void>({
      query: () => ({
        url: getApiUrl.refresh(),
        headers: { authorization: `Bearer ${refreshToken}` },
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => getApiUrl.profile(),
    }),
    googleLogin: builder.mutation<AuthResponse, string>({
      query: (code: string) => ({
        url: getApiUrl.googleLogin(),
        method: 'POST',
        body: { code },
      }),
    }),
    googleOneTap: builder.mutation<AuthResponse, string>({
      query: (credential: string) => ({
        url: getApiUrl.googleOneTap(),
        method: 'POST',
        body: { credential },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyGetNewTokensQuery,
  useGetProfileQuery,
  useGoogleLoginMutation,
  useGoogleOneTapMutation,
} = authApi;

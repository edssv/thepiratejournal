import { useMutation } from '@tanstack/react-query';
import { axiosClassic, instance, refreshInstance } from '@/api/api.interceptor';
import { AuthResponse, LoginData, SignupData } from '@/store/user/user.interface';
import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';
import { User } from '@/interfaces/user.interface';
import { saveToStorage } from './auth.helper';

export interface LoginRequest {
  username?: string;
  email: string;
  password: string;
}

export const AuthService = {
  async login(formData: LoginData) {
    const { data } = await axiosClassic<AuthResponse>({
      url: ApiUrlBuilder.Login,
      method: 'POST',
      data: formData,
    });

    if (data.accessToken) saveToStorage(data);
    return data;
  },

  async signup(formData: SignupData) {
    const { data } = await axiosClassic<AuthResponse>({
      url: ApiUrlBuilder.Signup,
      method: 'POST',
      data: formData,
    });

    if (data.accessToken) saveToStorage(data);

    return data;
  },

  async getNewTokens() {
    const { data } = await refreshInstance<string, { data: AuthResponse }>({
      url: ApiUrlBuilder.Refresh,
      method: 'POST',
    });

    if (data.accessToken) saveToStorage(data);

    return data;
  },

  async getProfile() {
    return instance<User>({
      url: ApiUrlBuilder.Profile,
      method: 'GET',
    });
  },

  async googleLogin(code: string) {
    const { data } = await axiosClassic<AuthResponse>({
      url: getApiUrl.googleLogin(),
      method: 'POST',
      data: { code: code },
    });

    if (data.accessToken) saveToStorage(data);
    return data;
  },

  async googleOneTap(credential: string) {
    const { data } = await axiosClassic<AuthResponse>({
      url: getApiUrl.googleOneTap(),
      method: 'POST',
      data: { credential: credential },
    });

    if (data.accessToken) saveToStorage(data);
    return data;
  },
};

export const useLoginMutation = () => {
  return useMutation(['create article'], AuthService.login);
};

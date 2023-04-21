import axios from 'axios';

import { AuthService } from '@/services';
import { getAccessToken, getRefreshToken, removeFromStorage } from '@/services/auth/auth.helper';
import { errorCatch, getContentType } from './api.helper';

export const axiosOptions = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN + '/' + process.env.NEXT_PUBLIC_API_PREFIX,
  headers: getContentType(),
};

export const serverAxiosOptions = {
  baseURL: process.env.SERVER_DOMAIN + '/' + process.env.NEXT_PUBLIC_API_PREFIX,
  headers: getContentType(),
};

export const axiosClassic = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);
export const serverAxiosClassic = axios.create(serverAxiosOptions);

instance.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired' || errorCatch(error) === 'Unauthorized') {
          removeFromStorage();
        }
      }
    }

    throw error;
  }
);

export const refreshInstance = axios.create(axiosOptions);

refreshInstance.interceptors.request.use(async (config) => {
  const refreshToken = getRefreshToken();

  if (config.headers && refreshToken) {
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }

  return config;
});

refreshInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401) {
      removeFromStorage();
    }

    throw error;
  }
);

import Cookies from 'js-cookie';

import { AuthResponse, Tokens } from '@/store/user/user.interface';
import { Tokens as TokensEnum } from '@/lib/enums';

export const getAccessToken = () => {
  return Cookies.get(TokensEnum.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return Cookies.get(TokensEnum.REFRESH_TOKEN);
};

export const getUserFromStorage = async () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokensStorage = (data: Tokens) => {
  Cookies.set(TokensEnum.ACCESS_TOKEN, data.accessToken);
  Cookies.set(TokensEnum.REFRESH_TOKEN, data.refreshToken, { expires: 30 });
};

export const removeFromStorage = () => {
  Cookies.remove(TokensEnum.ACCESS_TOKEN);
  Cookies.remove(TokensEnum.REFRESH_TOKEN);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: AuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};

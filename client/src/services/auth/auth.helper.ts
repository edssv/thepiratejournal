import Cookies from 'js-cookie';

import type { SignupMutation } from '@/gql/__generated__';
import { Tokens as TokensEnum } from '@/lib/enums';
import type { Tokens } from '@/store/user/user.interface';

export const getAccessToken = () => Cookies.get(TokensEnum.ACCESS_TOKEN);

export const getRefreshToken = () => Cookies.get(TokensEnum.REFRESH_TOKEN);

export const getUserFromStorage = (): unknown => JSON.parse(localStorage.getItem('user') || '');

export const saveTokensStorage = (data: Tokens) => {
  Cookies.set(TokensEnum.ACCESS_TOKEN, data.accessToken, {
    expires: 30,
    sameSite: 'Strict',
    secure: true
  });
  Cookies.set(TokensEnum.REFRESH_TOKEN, data.refreshToken, {
    expires: 30,
    sameSite: 'Strict',
    secure: true
  });
};

export const removeFromStorage = () => {
  Cookies.remove(TokensEnum.ACCESS_TOKEN);
  Cookies.remove(TokensEnum.REFRESH_TOKEN);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: SignupMutation['signup']) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};

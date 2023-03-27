import Cookies from 'js-cookie';

import { AuthResponse, Tokens } from '@/store/user/user.interface';
import { Tokens as TokensEnum } from '@/lib/enums/token.enum';

export const getAccessToken = async () => {
    const accessToken = Cookies.get(TokensEnum.ACCESS_TOKEN);
    return accessToken || null;
};

export const getRefreshToken = async () => {
    const refreshToken = Cookies.get(TokensEnum.REFRESH_TOKEN);
    return refreshToken || null;
};

export const getUserFromStorage = async () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokensStorage = (data: Tokens) => {
    Cookies.set(TokensEnum.ACCESS_TOKEN, data.accessToken);
    Cookies.set(TokensEnum.REFRESH_TOKEN, data.refreshToken);
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

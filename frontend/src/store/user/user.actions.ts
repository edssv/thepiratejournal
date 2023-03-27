import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiUrlBuilder } from '@/lib/apiUrlBuilder';
import { AuthService } from '..';
import { AuthResponse, LoginData, SignupData } from './user.interface';
import { removeFromStorage } from '@/services/auth/auth.helper';
import { errorCatch } from '@/api/api.helper';

export const login = createAsyncThunk<AuthResponse, LoginData>(ApiUrlBuilder.Login, async (data, thunkApi) => {
    try {
        const response = await AuthService.login(data);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const signup = createAsyncThunk<AuthResponse, SignupData>(ApiUrlBuilder.Signup, async (data, thunkApi) => {
    try {
        const response = await AuthService.signup(data);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const logout = createAsyncThunk(ApiUrlBuilder.Logout, async () => {
    removeFromStorage();
});

export const checkAuth = createAsyncThunk<AuthResponse>(ApiUrlBuilder.Refresh, async (_, thunkApi) => {
    try {
        const response = await AuthService.getNewTokens();
        return response.data;
    } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
            thunkApi.dispatch(logout());
        }

        return thunkApi.rejectWithValue(error);
    }
});

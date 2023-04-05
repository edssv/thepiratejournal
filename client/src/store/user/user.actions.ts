import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@/services';
import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';
import { AuthResponse, LoginData, SignupData } from './user.interface';
import { removeFromStorage } from '@/services/auth/auth.helper';
import { errorCatch } from '@/api/api.helper';

export const login = createAsyncThunk<AuthResponse, LoginData>(ApiUrlBuilder.Login, async (data, thunkApi) => {
  try {
    return await AuthService.login(data);
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const signup = createAsyncThunk<AuthResponse, SignupData>(ApiUrlBuilder.Signup, async (data, thunkApi) => {
  try {
    return await AuthService.signup(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk(ApiUrlBuilder.Logout, () => {
  removeFromStorage();
});

export const checkAuth = createAsyncThunk<AuthResponse>(ApiUrlBuilder.Refresh, async (_, thunkApi) => {
  try {
    return await AuthService.getNewTokens();
  } catch (error) {
    if (errorCatch(error) === 'Unauthorized') {
      thunkApi.dispatch(logout());
    }

    return thunkApi.rejectWithValue(error);
  }
});

export const googleLogin = createAsyncThunk<AuthResponse, string>(getApiUrl.googleLogin(), async (data, thunkApi) => {
  try {
    return await AuthService.googleLogin(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const googleOneTap = createAsyncThunk<AuthResponse, string>(getApiUrl.googleOneTap(), async (data, thunkApi) => {
  try {
    return await AuthService.googleOneTap(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

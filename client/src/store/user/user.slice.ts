import { createSlice } from '@reduxjs/toolkit';

import { removeFromStorage, saveToStorage } from '@/services/auth/auth.helper';
import { authApi } from '@/services/auth/auth.service';
import { getLocalStorage } from '@/utils';

import type { InitialState } from './user.interface';

const initialState: InitialState = {
  user: getLocalStorage('user'),
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    tokenReceived: (state, { payload }) => {
      saveToStorage(payload);
    },
    logout: (state) => {
      state.user = null;
      removeFromStorage();
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }: { payload: any }) => {
        state.user = payload.user;
        saveToStorage(payload);
      })
      .addMatcher(authApi.endpoints.signup.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }: { payload: any }) => {
        state.user = payload.user;
        saveToStorage(payload);
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.getNewTokens.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.getNewTokens.matchFulfilled, (state, { payload }: { payload: any }) => {
        state.user = payload.user;
        saveToStorage(payload);
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.getNewTokens.matchRejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.googleLogin.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.googleLogin.matchFulfilled, (state, { payload }: { payload: any }) => {
        state.user = payload.user;
        saveToStorage(payload);
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.googleLogin.matchRejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.googleOneTap.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.googleOneTap.matchFulfilled, (state, { payload }: { payload: any }) => {
        state.user = payload.user;
        saveToStorage(payload);
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.googleOneTap.matchRejected, (state) => {
        state.isLoading = false;
      });
  }
});

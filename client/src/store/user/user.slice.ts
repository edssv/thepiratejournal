import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '@/utils';
import type { RootState } from '../store';
import { checkAuth, googleLogin, googleOneTap, login, logout, signup } from './user.actions';
import { InitialState } from './user.interface';

const initialState: InitialState = {
    user: getLocalStorage('user'),
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
            })
            .addCase(signup.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.user = payload.user;
            })
            .addCase(googleLogin.fulfilled, (state, { payload }) => {
                state.user = payload.user;
            })
            .addCase(googleOneTap.fulfilled, (state, { payload }) => {
                state.user = payload.user;
            });
    },
});

export const selectUser = (state: RootState) => state.user.user;

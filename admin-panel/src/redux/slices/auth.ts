import { createSlice } from '@reduxjs/toolkit';

import { authApi, User } from '../services/auth';
import type { RootState } from '../store';

type AuthState = {
    user: User | null;
    isLoading: boolean;
};

const slice = createSlice({
    name: 'auth',
    initialState: { user: {}, isLoading: false } as AuthState,
    reducers: {
        tokenReceived: (state, { payload }) => {
            localStorage.setItem('token', payload.token);
        },
        loggedOut: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                localStorage.setItem('token', payload.token);
            })
            .addMatcher(authApi.endpoints.googlelogin.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                localStorage.setItem('token', payload.token);
            })

            // logout
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                localStorage.removeItem('token');
            })

            // auth
            .addMatcher(authApi.endpoints.getCurrentUser.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isLoading = false;
            })
            .addMatcher(authApi.endpoints.getCurrentUser.matchRejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default slice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

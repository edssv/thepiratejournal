import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { User } from '../services/user';
import type { RootState } from '../store';

type AuthState = {
    user: User | null;
    token: string | null;
};

const slice = createSlice({
    name: 'auth',
    initialState: { user: null } as AuthState,
    reducers: {
        tokenReceived: (state, { payload }) => {
            state.token = payload.token;
            localStorage.setItem('token', payload.token);
        },
        loggedOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {})
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                localStorage.setItem('token', payload.token);
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action);
            })

            // signup
            .addMatcher(authApi.endpoints.signup.matchPending, (state, action) => {
                console.log('pending', action);
            })
            .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                localStorage.setItem('token', payload.token);
            })
            .addMatcher(authApi.endpoints.signup.matchRejected, (state, action) => {
                console.log('rejected', action);
            })

            // logout
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                localStorage.removeItem('token');
            })

            // getCurrentUser
            .addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
            });
    },
});

export const { tokenReceived, loggedOut } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.token;

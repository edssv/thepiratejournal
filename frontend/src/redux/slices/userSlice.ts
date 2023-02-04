import { createSlice } from '@reduxjs/toolkit';
import { Notification, userApi } from '../services';
import type { RootState } from '../store';

type UserState = {
    user: { notifications: { list: Notification[]; totalCount: number } };
};

const slice = createSlice({
    name: 'user',
    initialState: {
        user: { notifications: { list: [], totalCount: 0 } },
    } as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get notifications
            .addMatcher(userApi.endpoints.getNotifications.matchFulfilled, (state, { payload }) => {
                const notifications = state.user.notifications.list ?? [];
                state.user.notifications.list = [...notifications, ...payload.notifications.list];
                state.user.notifications.totalCount = payload.notifications.totalCount;
            });
    },
});

export default slice.reducer;

export const selectUser = (state: RootState) => state.user.user;

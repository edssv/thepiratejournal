import { instance } from '@/api/api.interceptor';
import { User } from '@/interfaces/user.interface';
import { ApiUrlBuilder } from '@/lib/apiUrlBuilder';
import { api } from './api';

export interface NotificationsResponse {
    notifications: { list: Notification[]; totalCount: number };
}

export const UserService = {
    async getUser(id: number) {
        return instance<User>({
            url: `${ApiUrlBuilder.Users}/${id}`,
            method: 'GET',
        });
    },
};

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, any>({
            query: ({ username, category }) => `users/${username}/${category}`,
            providesTags: ['User'],
        }),
        uploadAvatar: builder.mutation<any, any>({
            query: (body) => ({
                url: 'profile/avatar',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        follow: builder.mutation<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}/followers`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        unFollow: builder.mutation<UserResponse, any>({
            query: (username) => ({
                url: `users/${username}/followers`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addBookmark: builder.mutation<UserResponse, any>({
            query: (id) => ({
                url: `bookmarks/${id}`,
                method: 'POST',
            }),
        }),
        removeBookmark: builder.mutation<UserResponse, any>({
            query: (id) => ({
                url: `bookmarks/${id}`,
                method: 'DELETE',
            }),
        }),
        getNotifications: builder.query<NotificationsResponse, any>({
            query: (queryParams) => `notifications/?${queryParams}`,
            providesTags: ['Notifications'],
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `notifications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notifications'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useUploadAvatarMutation,
    useFollowMutation,
    useUnFollowMutation,
    useAddBookmarkMutation,
    useRemoveBookmarkMutation,
    useGetNotificationsQuery,
    useDeleteNotificationMutation,
} = userApi;

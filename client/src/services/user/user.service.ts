import { useMutation, useQuery } from '@tanstack/react-query';

import { axiosClassic, instance } from '@/api/api.interceptor';
import { User } from '@/interfaces/user.interface';
import { getApiUrl } from '@/lib/apiUrlBuilder';

export interface NotificationsResponse {
    notifications: { list: Notification[]; totalCount: number };
}

export const UserService = {
    async getAll() {
        const { data } = await axiosClassic<User[]>({
            url: getApiUrl.getUsers(),
            method: 'GET',
        });
        return data;
    },

    async getUser(id: string, articles: string) {
        const { data } = await axiosClassic<User & { content: [] }>({
            url: getApiUrl.getUser(id, articles),
            method: 'GET',
        });
        return data;
    },

    async follow(id: string) {
        const { data } = await axiosClassic<User & { content: [] }>({
            url: getApiUrl.followUser(id),
            method: 'POST',
        });
        return data;
    },

    async unFollow(id: string) {
        const { data } = await axiosClassic<User & { content: [] }>({
            url: getApiUrl.followUser(id),
            method: 'DELETE',
        });
        return data;
    },
};

export const useGetUser = (id: string, articles: string) => {
    return useQuery(['user', id, articles], () => UserService.getUser(id, articles));
};

export const useFollowUserMutation = () => {
    return useMutation(['user'], UserService.follow);
};

export const useUnFollowUserMutation = () => {
    return useMutation(['user'], UserService.unFollow);
};

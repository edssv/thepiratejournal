import { useMutation } from '@tanstack/react-query';

import { instance } from '@/api/api.interceptor';
import { getApiUrl } from '@/lib/apiUrlBuilder';

export const BookmarkService = {
    async create(id: string) {
        const { data } = await instance({
            url: getApiUrl.bookmark(id),
            method: 'POST',
        });
        return data;
    },

    async delete(id: string) {
        const { data } = await instance({
            url: getApiUrl.bookmark(id),
            method: 'DELETE',
        });
        return data;
    },
};

export const useCreateBookmarkMutation = () => {
    return useMutation(['bookmark'], BookmarkService.create);
};

export const useDeleteBookmarkMutation = () => {
    return useMutation(['bookmark'], BookmarkService.delete);
};

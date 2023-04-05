import { useMutation, useQuery } from '@tanstack/react-query';

import { instance } from '@/api/api.interceptor';
import { getApiUrl } from '@/lib/apiUrlBuilder';

export const LikeService = {
    async like(id: string) {
        const { data } = await instance({
            url: getApiUrl.likeArticle(id),
            method: 'POST',
        });
        return data;
    },

    async removeLike(id: string) {
        const { data } = await instance({
            url: getApiUrl.removeLikeArticle(id),
            method: 'DELETE',
        });
        return data;
    },
};

export const useLikeArticleMutation = () => {
    return useMutation(['like'], LikeService.like);
};

export const useRemoveLikeArticleMutation = () => {
    return useMutation(['remove like'], LikeService.removeLike);
};

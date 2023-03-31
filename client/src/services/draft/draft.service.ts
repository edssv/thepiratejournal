import { instance } from '@/api/api.interceptor';
import { Article } from '@/interfaces/article.interface';
import { getApiUrl } from '@/lib/apiUrlBuilder';
import { useMutation, useQuery } from '@tanstack/react-query';

export const DraftService = {
    async getOne(id: string) {
        const { data } = await instance<Partial<Article>>({
            url: getApiUrl.getOneDraft(id),
            method: 'GET',
        });
        return data;
    },

    async create(draftData: Partial<Article>) {
        const { data } = await instance<Partial<Article>>({
            url: getApiUrl.createDraft(),
            method: 'POST',
            data: draftData,
        });
        return data;
    },

    async update(id: string, draftData: Partial<Article>) {
        const { data } = await instance<Partial<Article>>({
            url: getApiUrl.updateDraft(id),
            method: 'PATCH',
            data: draftData,
        });
        return data;
    },

    async delete(id: string) {
        const { data } = await instance<Partial<Article>>({
            url: getApiUrl.deleteDraft(id),
            method: 'DELETE',
        });
        return data;
    },
};

export const useCreateDraftMutation = () => {
    return useMutation(['create draft'], DraftService.create);
};

export const useGetOneDraftQuery = (id: string, enabled = true) => {
    return useQuery(['draft', id], () => DraftService.getOne(id), { enabled: enabled });
};

export const useUpdateDraftMutation = (id: string, draftData: Partial<Article>) => {
    return useMutation(['update draft'], () => DraftService.update(id, draftData));
};

export const useDeleteDraftMutation = () => {
    return useMutation(['delete draft'], DraftService.delete);
};

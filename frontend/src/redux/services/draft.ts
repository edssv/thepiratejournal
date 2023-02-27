import { api } from './api';
import { Block } from './article';

export interface Draft {
    _id: string;
    author: { _id: string; username: string };
    title?: string;
    cover?: string;
    blocks?: Block[];
    createdAt: number;
}

export const draftApi = api.injectEndpoints({
    endpoints: (build) => ({
        createDraft: build.mutation({
            query: (body) => ({
                url: 'drafts',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Articles'],
        }),
    }),
});

export const { useCreateDraftMutation } = draftApi;

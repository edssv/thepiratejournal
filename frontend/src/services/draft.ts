import { api } from './api';
import { Block } from './article.service';

export interface Draft {
    _id: string;
    author: { _id: string; username: string };
    title?: string;
    description?: string;
    cover?: string;
    blocks?: Block[];
    category?: { name: string; game: string; key: string };
    tags: [];
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
        }),
        getDraft: build.query<Draft, string>({
            query: (_id) => `drafts/${_id}`,
        }),
    }),
});

export const { useCreateDraftMutation, useGetDraftQuery } = draftApi;

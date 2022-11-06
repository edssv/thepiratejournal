import { api } from './api';

export interface Block {
    id: string;
    type: string;
    data: {
        level: number;
        text: string;
    };
}

export interface Article {
    _id: string;
    author: { id: string; userName: string };
    cover: string;
    blocks: Block[];
    timestamp: string;
    views: { count: number };
    likes: { count: number };
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query({
            query: (id) => `articles/${id}`,
        }),
        getArticles: build.query({
            query: () => `articles`,
        }),

        addCover: build.mutation({
            query: (body) => ({
                url: 'upload',
                method: 'POST',
                body,
            }),
        }),
        deleteCover: build.mutation({
            query: (body) => ({
                url: 'upload',
                method: 'DELETE',
                body,
            }),
        }),
        addArticle: build.mutation({
            query: (body) => ({
                url: 'articles',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetArticleQuery,
    useGetArticlesQuery,
    useAddCoverMutation,
    useDeleteCoverMutation,
    useAddArticleMutation,
} = articleApi;

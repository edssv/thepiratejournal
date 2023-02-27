import { api } from './api';

export interface Block {
    id: string;
    type: string;
    data: {
        level?: number;
        text: string;
    };
}

export interface Article {
    _id: string;
    author: { _id: string; username: string; avatar: string; subscribersCount: number };
    title: string;
    cover: string;
    blocks: [];
    tags: [];
    category: { name: string; game: string; key: string };
    readingTime: number;
    createdAt: number;
    isPublished: boolean;
}

interface getArticlesResponse {
    articles: Article[];
    totalCount: number;
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query<{ article: Article }, string>({
            query: (id) => `articles/${id}`,
            providesTags: ['Articles'],
        }),
        getArticles: build.query<getArticlesResponse, { page: number; limit: number; category: string }>({
            query: ({ page, limit, category }) => `articles/category/${category}?limit=${limit}&page=${page}`,
            providesTags: ['Articles'],
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
        deleteArticle: build.mutation({
            query: (id) => ({
                url: `articles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Articles'],
        }),
        editArticle: build.mutation({
            query: ({ data, id }) => ({
                url: `articles/${id}/edit`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Articles'],
        }),
        publishArticle: build.mutation({
            query: ({ data, id }) => ({
                url: `articles/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Articles'],
        }),
    }),
});

export const {
    useGetArticleQuery,
    useGetArticlesQuery,
    useAddCoverMutation,
    useDeleteCoverMutation,
    useDeleteArticleMutation,
    useEditArticleMutation,
    usePublishArticleMutation,
} = articleApi;

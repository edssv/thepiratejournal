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
    author: { id: string; username: string };
    title: string;
    cover: string;
    blocks: Block[];
    timestamp: string;
    views: { count: number };
    likes: { count: number };
}
export interface ArticleResponse {
    article: Article;
    author: { id: string; username: string };
    isLiked: boolean;
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query({
            query: (id) => `articles/${id}`,
            providesTags: ['Articles'],
        }),
        getArticleEdit: build.query({
            query: (id) => `articles/${id}/edit`,
            providesTags: ['Articles'],
        }),
        getArticles: build.query({
            query: () => `articles`,
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
        addArticle: build.mutation({
            query: (body) => ({
                url: 'articles',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Articles'],
        }),
        deleteArticle: build.mutation({
            query: (id) => ({
                url: `articles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Articles'],
        }),
        editArticle: build.mutation({
            query: ({ formData, id }) => ({
                url: `articles/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Articles'],
        }),
        like: build.mutation({
            query: (id) => ({
                url: `articles/${id}/like/like`,
                method: 'PATCH',
            }),
        }),
        removeLike: build.mutation({
            query: (id) => ({
                url: `articles/${id}/like/removelike`,
                method: 'PATCH',
            }),
        }),
    }),
});

export const {
    useGetArticleQuery,
    useGetArticleEditQuery,
    useGetArticlesQuery,
    useAddCoverMutation,
    useLikeMutation,
    useRemoveLikeMutation,
    useDeleteCoverMutation,
    useDeleteArticleMutation,
    useAddArticleMutation,
    useEditArticleMutation,
} = articleApi;

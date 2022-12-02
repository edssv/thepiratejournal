import { api } from './api';

export interface Block {
    id: string;
    type: string;
    data: {
        level: number;
        text: string;
    };
}

export interface Draft {
    _id: string;
    author: { _id: string; username: string };
    title?: string;
    cover?: string;
    blocks?: Block[];
    timestamp: string;
}
export interface Article {
    _id: string;
    author: { _id: string; username: string; avatar: string };
    title: string;
    cover: string;
    blocks: any;
    timestamp: string;
    isPublished: boolean;
    views: { count: number };
    likes: { count: number };
    isLike: boolean;
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query<Article, string | undefined>({
            query: (id) => `articles/${id}`,
            providesTags: ['Articles'],
        }),
        getArticles: build.query({
            query: ({ section }) => `articles/main/${section}`,
            providesTags: ['Articles'],
        }),
        searchArticles: build.query({
            query: ({ category, queryParams }) => `search/${category}?${queryParams}`,
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
                method: 'PUT',
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
    useGetArticlesQuery,
    useSearchArticlesQuery,
    useAddCoverMutation,
    useLikeMutation,
    useRemoveLikeMutation,
    useDeleteCoverMutation,
    useDeleteArticleMutation,
    useAddArticleMutation,
    useEditArticleMutation,
} = articleApi;

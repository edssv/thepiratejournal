import { api } from './api';

export interface Block {
    id: string;
    type: string;
    data: {
        level?: number;
        text: string;
    };
}

export interface Comment {
    comment: { _id: string; author: string; text: string; created_on: number };
    author: { _id: string; username: string; avatar: string };
}

export interface Draft {
    _id: string;
    author: { _id: string; username: string };
    title?: string;
    cover?: string;
    blocks?: Block[];
    created_on: number;
}
export interface Article {
    _id: string;
    author: { _id: string; username: string; avatar: string; subscribers_count: number };
    title: string;
    cover: string;
    blocks: any;
    tags: [];
    category: { category_name: string; game: string };
    created_on: number;
    isPublished: boolean;
    comments: Comment[];
    views: { count: number };
    likes: { count: number };
    viewer: { hasSubscription: boolean; hasBookmark: boolean; isLike: boolean };
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query<Article, string | undefined>({
            query: (id) => `articles/${id}`,
            providesTags: ['Articles'],
        }),
        getMutableArticle: build.query<Article, string | undefined>({
            query: (id) => `articles/edit/${id}`,
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
        addComment: build.mutation({
            query: ({ commentText, id }) => ({
                url: `articles/${id}/comments/add`,
                method: 'PATCH',
                body: { commentText: commentText },
            }),
            invalidatesTags: ['Articles'],
        }),
        removeComment: build.mutation({
            query: ({ commentId, id }) => ({
                url: `articles/${id}/comments/remove`,
                method: 'PATCH',
                body: { commentId: commentId },
            }),
        }),
    }),
});

export const {
    useGetArticleQuery,
    useGetMutableArticleQuery,
    useGetArticlesQuery,
    useSearchArticlesQuery,
    useAddCoverMutation,
    useLikeMutation,
    useRemoveLikeMutation,
    useDeleteCoverMutation,
    useDeleteArticleMutation,
    useAddArticleMutation,
    useEditArticleMutation,
    useAddCommentMutation,
    useRemoveCommentMutation,
} = articleApi;

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
    description: string;
    cover: string;
    blocks: Block[];
    tags: [];
    category: { name: string; game: string; key: string };
    createdAt: number;
    isPublished: boolean;
}

interface getArticlesResponse {
    articles: Article[];
    totalCount: number;
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query<{ article: Article }, { id: string; type: 'articles' | 'blog' }>({
            query: ({ id, type }) => `${type}/${id}`,
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
            query: (url) => ({
                url: 'upload',
                method: 'DELETE',
                body: url,
            }),
        }),
        deleteArticle: build.mutation({
            query: ({ id, type }) => ({
                url: `${type}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Articles'],
        }),
        editArticle: build.mutation({
            query: (formData) => ({
                url: `articles/${formData._id}/edit`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Articles'],
        }),
        publishArticle: build.mutation({
            query: (formData) => ({
                url: `articles/${formData._id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Articles'],
        }),
        publishBlog: build.mutation({
            query: (formData) => ({
                url: `blog`,
                method: 'POST',
                body: formData,
            }),
        }),
        editBlog: build.mutation({
            query: (formData) => ({
                url: `blog/${formData._id}/edit`,
                method: 'PUT',
                body: formData,
            }),
        }),
        saveChangesBlog: build.mutation({
            query: (formData) => ({
                url: `blog/${formData._id}/save`,
                method: 'PUT',
                body: formData,
            }),
        }),
        getBlog: build.query<{ article: Article }, string>({
            query: (id) => `blog/${id}`,
            providesTags: ['Articles'],
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
    usePublishBlogMutation,
    useEditBlogMutation,
    useSaveChangesBlogMutation,
    useGetBlogQuery,
} = articleApi;

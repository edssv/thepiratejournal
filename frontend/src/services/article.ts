import axios from 'axios';
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
    _id: string;
    body: string;
    createdAt: number;
    likesCount: number;
    author: { _id: string; username: string; avatar: string };
    viewer: { isLike: boolean };
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
    readingTime: number;
    createdAt: number;
    isPublished: boolean;
    comments: { list: Comment[]; totalCount: number };
    viewsCount: number;
    likesCount: number;
}

interface ArticleResponse extends Article {
    viewer: {
        hasSubscription: boolean;
        hasBookmark: boolean;
        isLike: boolean;
    };
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const ArticleService = {
    async getAll() {
        const { data } = await axios.get<Article[]>('/articles');
        return data;
    },
};

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query<ArticleResponse, string>({
            query: (id) => `articles/${id}`,
            providesTags: ['Articles'],
        }),
        getComments: build.query<{ commentsList: Comment[]; totalCount: number }, { id: string; queryParams: string }>({
            query: ({ id, queryParams }) => `articles/${id}/comments?${queryParams}`,
        }),
        getNextArticles: build.query<{ articles: Article[] }, { id: string }>({
            query: ({ id }) => `articles/${id}/next`,
        }),
        getLastTags: build.query<{ tags: [] }, ''>({
            query: () => 'articles/tags',
        }),
        getMostPopularArticle: build.query<Article, ''>({
            query: () => 'articles/mostPopular',
        }),
        getAuthorChoice: build.query<Article[], ''>({
            query: () => 'articles/authorChoice',
        }),
        getBestOfWeak: build.query<Article[], ''>({
            query: () => 'articles/bestOfWeak',
        }),
        getNewest: build.query<Article[], ''>({
            query: () => 'articles/newest',
        }),
        getArticles: build.query<Article[], { section: 'for_you' | 'following'; queryParams: string }>({
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
            query: (url) => ({
                url: 'upload',
                method: 'DELETE',
                body: url,
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
            query: (formData) => ({
                url: `articles/${formData._id}`,
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
            query: ({ body, id }) => ({
                url: `articles/${id}/comments/add`,
                method: 'PATCH',
                body: { body },
            }),
        }),
        removeComment: build.mutation({
            query: ({ commentId, id }) => ({
                url: `articles/${id}/comments/remove`,
                method: 'DELETE',
                body: { commentId: commentId },
            }),
        }),
        likeComment: build.mutation({
            query: ({ commentId, articleId, index }) => ({
                url: `articles/${articleId}/comments/${commentId}/like`,
                method: 'PATCH',
                body: { index },
            }),
        }),
        removeLikeComment: build.mutation({
            query: ({ commentId, articleId, index }) => ({
                url: `articles/${articleId}/comments/${commentId}/removelike`,
                method: 'PATCH',
                body: { index },
            }),
        }),
    }),
});

export const {
    useGetArticleQuery,
    useGetCommentsQuery,
    useGetNextArticlesQuery,
    useGetLastTagsQuery,
    useGetMostPopularArticleQuery,
    useGetAuthorChoiceQuery,
    useGetBestOfWeakQuery,
    useGetNewestQuery,
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
    useLikeCommentMutation,
    useRemoveLikeCommentMutation,
    util: { getRunningQueriesThunk },
} = articleApi;

export const { getArticle, getAuthorChoice } = articleApi.endpoints;

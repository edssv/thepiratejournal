import { HomeSection } from '../../pages/Home/SignedIn';
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
    comment: {
        _id: string;
        author: string;
        text: string;
        created_on: number;
        likes: { count: number; users: [] };
    };
    author: { _id: string; username: string; avatar: string };
    viewer: { isLike: boolean };
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
    description: string;
    cover: string;
    blocks: any;
    tags: [];
    category: { name: string; game: string; key: string };
    reading_time: number;
    created_on: number;
    isPublished: boolean;
    comments: { list: Comment[]; totalCount: number };
    views: { count: number };
    likes: { count: number };
    viewer: {
        hasSubscription: boolean;
        hasBookmark: boolean;
        isLike: boolean;
    };
    suggestions: {
        articles: {
            all: { list: Article[]; totalCount: number };
            similar: { list: Article[]; totalCount: number };
        };
    };
}

export const articleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getArticle: build.query<Article, string>({
            query: (id) => `articles/${id}`,
            providesTags: ['Articles'],
        }),
        getComments: build.query<{ commentsList: Comment[]; totalCount: number }, { id: string; queryParams: string }>({
            query: ({ id, queryParams }) => `articles/${id}/comments?${queryParams}`,
        }),
        getSuggestions: build.query<
            { articles: Article[]; totalCount: number; categoryName: 'all' | 'similar' },
            { id: string; category: 'all' | 'similar'; queryParams: string }
        >({
            query: ({ id, category, queryParams }) => `articles/${id}/suggestions/${category}?${queryParams}`,
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
        getArticles: build.query<Article[], { section: HomeSection; queryParams: string }>({
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
            query: ({ commentText, id }) => ({
                url: `articles/${id}/comments/add`,
                method: 'PATCH',
                body: { commentText: commentText },
            }),
        }),
        removeComment: build.mutation({
            query: ({ commentId, id, index }) => ({
                url: `articles/${id}/comments/remove`,
                method: 'DELETE',
                body: { commentId: commentId, id, index },
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
    useGetSuggestionsQuery,
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
} = articleApi;

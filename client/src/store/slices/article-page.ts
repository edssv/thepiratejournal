import { Article } from '@/interfaces/article.interface';
import { Blog } from '@/interfaces/blog.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type ArticlePageState = {
    mode: 'article' | 'blog' | null;
    data: Article | Blog;
    comments: { commentsList: Comment[]; totalCount: number };
    viewer: {
        hasSubscription: boolean | null;
        hasBookmark: boolean | null;
        isLike: boolean | null;
    };
};

const slice = createSlice({
    name: 'article-page',
    initialState: {
        mode: null,
        data: {},
        viewer: {
            hasSubscription: null,
            hasBookmark: null,
            isLike: null,
        },
    } as ArticlePageState,
    reducers: {
        setArticlePageMode: (state, { payload }) => {
            state.mode = payload;
        },

        setLike: (state, { payload }) => {
            state.viewer.isLike = payload;
        },
    },
    extraReducers: (builder) => {
        builder;
        // get article
        // .addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
        //     state.data = payload;
        // })
        // .addMatcher(blogApi.endpoints.getBlog.matchFulfilled, (state, { payload }) => {
        //     state.data = payload;
        // })

        // // get comments
        // .addMatcher(articleApi.endpoints.getComments.matchFulfilled, (state, { payload }) => {
        //     state.comments = payload;
        // })

        // // like
        // .addMatcher(articleApi.endpoints.like.matchFulfilled, (state) => {
        //     state.viewer.isLike = true;

        //     if ('likesCount' in state.data) {
        //         state.data.likesCount += 1;
        //     }
        // })
        // .addMatcher(articleApi.endpoints.removeLike.matchFulfilled, (state) => {
        //     state.viewer.isLike = false;

        //     if ('likesCount' in state.data) {
        //         state.data.likesCount -= 1;
        //     }
        // })

        // // bookmark
        // .addMatcher(userApi.endpoints.addBookmark.matchFulfilled, (state) => {
        //     state.viewer.hasBookmark = true;
        // })
        // .addMatcher(userApi.endpoints.removeBookmark.matchFulfilled, (state) => {
        //     state.viewer.hasBookmark = false;
        // })

        // // comments
        // .addMatcher(articleApi.endpoints.addComment.matchFulfilled, (state, { payload }) => {
        //     state.comments.commentsList.unshift(payload);
        //     state.comments.totalCount += 1;
        // })
        // .addMatcher(articleApi.endpoints.removeComment.matchFulfilled, (state, action) => {
        //     const commentIndex = action.meta.arg.originalArgs.index;
        //     state.comments.commentsList.splice(commentIndex, 1);
        //     state.comments.totalCount -= 1;
        // })
        // // like comment
        // .addMatcher(articleApi.endpoints.likeComment.matchFulfilled, (state, action) => {
        //     const commentIndex = action.meta.arg.originalArgs.index;
        //     const likesCount = state.comments.commentsList[commentIndex].likesCount;
        //     state.comments.commentsList[commentIndex].viewer.isLike = true;

        //     if (!likesCount) {
        //         state.comments.commentsList[commentIndex].likesCount = 1;
        //     } else {
        //         state.comments.commentsList[commentIndex].likesCount += 1;
        //     }
        // })
        // // remove like comment
        // .addMatcher(articleApi.endpoints.removeLikeComment.matchFulfilled, (state, action) => {
        //     const commentIndex = action.meta.arg.originalArgs.index;
        //     state.comments.commentsList[commentIndex].viewer.isLike = false;
        //     state.comments.commentsList[commentIndex].likesCount -= 1;
        // });
    },
});

export const { setArticlePageMode, setLike } = slice.actions;

export default slice.reducer;

export const articleDataSelector = (state: RootState) => state.articlePage.data;
export const articlePageModeSelector = (state: RootState) => state.articlePage.mode;
export const viewerSelector = (state: RootState) => state.articlePage.viewer;
export const commentsSelector = (state: RootState) => state.articlePage.comments;

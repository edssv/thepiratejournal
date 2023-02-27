import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi, userApi } from '../services';
import type { RootState } from '../store';

type ArticleState = {
    article: Article;
};

const slice = createSlice({
    name: 'article',
    initialState: {
        article: {},
    } as ArticleState,
    reducers: {
        setLike: (state, { payload }) => {
            state.article.viewer.isLike = payload;
        },
        resetArticle: (state, { payload }) => {
            state.article = payload;
        },
        setTitle: (state, { payload }) => {
            state.article.title = payload;
        },
        setCover: (state, { payload }) => {
            state.article.cover = payload;
        },
        setBlocks: (state, { payload }) => {
            state.article.blocks = payload.blocks;
        },
        setTags: (state, { payload }) => {
            state.article.tags = payload;
        },
        setArticleCategory: (state, { payload }) => {
            state.article.category = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // get article
            .addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
                state.article = payload;
            })

            // get comments
            .addMatcher(articleApi.endpoints.getComments.matchFulfilled, (state, { payload }) => {
                const comments = state.article.comments.list ?? [];

                state.article.comments = {
                    list: [...comments, ...payload.commentsList],
                    totalCount: payload.totalCount,
                };
            })

            // like
            .addMatcher(articleApi.endpoints.like.matchFulfilled, (state) => {
                state.article.viewer.isLike = true;
                state.article.likesCount += 1;
            })
            .addMatcher(articleApi.endpoints.removeLike.matchFulfilled, (state) => {
                state.article.viewer.isLike = false;
                state.article.likesCount -= 1;
            })

            // bookmark
            .addMatcher(userApi.endpoints.addBookmark.matchFulfilled, (state) => {
                state.article.viewer.hasBookmark = true;
            })
            .addMatcher(userApi.endpoints.removeBookmark.matchFulfilled, (state) => {
                state.article.viewer.hasBookmark = false;
            })

            // comments
            .addMatcher(articleApi.endpoints.addComment.matchFulfilled, (state, { payload }) => {
                state.article.comments.list.unshift(payload);
                state.article.comments.totalCount += 1;
            })
            .addMatcher(articleApi.endpoints.removeComment.matchFulfilled, (state, action) => {
                const commentIndex = action.meta.arg.originalArgs.index;
                state.article.comments.list.splice(commentIndex, 1);
                state.article.comments.totalCount -= 1;
            })
            // like comment
            .addMatcher(articleApi.endpoints.likeComment.matchFulfilled, (state, action) => {
                const commentIndex = action.meta.arg.originalArgs.index;
                const likesCount = state.article.comments.list[commentIndex].likesCount;
                state.article.comments.list[commentIndex].viewer.isLike = true;

                if (!likesCount) {
                    state.article.comments.list[commentIndex].likesCount = 1;
                } else {
                    state.article.comments.list[commentIndex].likesCount += 1;
                }
            })
            // remove like comment
            .addMatcher(articleApi.endpoints.removeLikeComment.matchFulfilled, (state, action) => {
                const commentIndex = action.meta.arg.originalArgs.index;
                state.article.comments.list[commentIndex].viewer.isLike = false;
                state.article.comments.list[commentIndex].likesCount -= 1;
            });
    },
});

export const { setLike, resetArticle, setTitle, setCover, setBlocks, setTags, setArticleCategory } = slice.actions;

export default slice.reducer;

export const selectArticle = (state: RootState) => state.article.article;

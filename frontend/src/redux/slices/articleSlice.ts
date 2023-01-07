import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi, userApi } from '../services';
import type { RootState } from '../store';

type ArticleState = {
    article: Article;
    mutableArticle: Article;
};

const slice = createSlice({
    name: 'article',
    initialState: {
        article: {},
        mutableArticle: {
            _id: '',
            title: '',
            cover: '',
            blocks: [],
            tags: [],
            category: { name: '', game: '', key: '' },
        },
    } as ArticleState,
    reducers: {
        setLike: (state, { payload }) => {
            console.log(payload);
            state.article.viewer.isLike = payload;
        },
        resetMutableArticle: (state, { payload }) => {
            state.mutableArticle = payload;
        },
        setTitle: (state, { payload }) => {
            state.mutableArticle.title = payload;
        },
        setCover: (state, { payload }) => {
            state.mutableArticle.cover = payload;
        },
        setBlocks: (state, { payload }) => {
            state.mutableArticle.blocks = payload.blocks;
        },
        setTags: (state, { payload }) => {
            state.mutableArticle.tags = payload;
        },
        setArticleCategory: (state, { payload }) => {
            state.mutableArticle.category = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // get article
            .addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
                state.article = payload;
                state.mutableArticle.blocks = payload.blocks;
            })

            // get mutable article
            .addMatcher(
                articleApi.endpoints.getMutableArticle.matchFulfilled,
                (state, { payload }) => {
                    state.mutableArticle = payload;
                },
            )

            // like
            .addMatcher(articleApi.endpoints.like.matchFulfilled, (state) => {
                state.article.viewer.isLike = true;
                state.article.likes.count += 1;
            })
            .addMatcher(articleApi.endpoints.removeLike.matchFulfilled, (state) => {
                state.article.viewer.isLike = false;
                state.article.likes.count -= 1;
            })

            // bookmark
            .addMatcher(userApi.endpoints.addBookmark.matchFulfilled, (state) => {
                state.article.viewer.hasBookmark = true;
            })
            .addMatcher(userApi.endpoints.removeBookmark.matchFulfilled, (state) => {
                state.article.viewer.hasBookmark = false;
            })

            // comments
            .addMatcher(articleApi.endpoints.removeComment.matchFulfilled, (state, { payload }) => {
                console.log(payload);
                state.article.comments.splice(payload.index, 1);
            });
    },
});

export const {
    setLike,
    resetMutableArticle,
    setTitle,
    setCover,
    setBlocks,
    setTags,
    setArticleCategory,
} = slice.actions;

export default slice.reducer;

export const selectArticle = (state: RootState) => state.article.article;
export const selectMutableArticle = (state: RootState) => state.article.mutableArticle;

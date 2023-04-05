import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi } from '../services';
import type { RootState } from '../store';

type ArticleState = {
    article: Article;
    mode: 'default' | 'blog';
};

const slice = createSlice({
    name: 'article',
    initialState: {
        article: {},
    } as ArticleState,
    reducers: {
        resetArticle: (state, { payload }) => {
            state.article = payload;
        },
        setMode: (state, { payload }) => {
            state.mode = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
            state.article = payload.article;
        });
    },
});

export const { resetArticle, setMode: setArticlePageMode } = slice.actions;

export default slice.reducer;

export const selectArticle = (state: RootState) => state.article.article;
export const articlePageModeSelector = (state: RootState) => state.article.mode;

import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi } from '../services/article';
import type { RootState } from '../store';

type ArticleState = {
    article: Article | null;
    author: { id: string; username: string } | null;
    isLiked: boolean;
};

const slice = createSlice({
    name: 'article',
    initialState: { article: null, author: null } as ArticleState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get Article
            .addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
                state.article = payload.article;
                state.author = payload.author;
                state.isLiked = payload.isLiked;
            });
    },
});

export default slice.reducer;

export const selectArticle = (state: RootState) => state.article.article;
export const selectAuthor = (state: RootState) => state.article.author;
export const selectIsLiked = (state: RootState) => state.article.isLiked;

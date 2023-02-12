import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi } from '../services';
import type { RootState } from '../store';

type ArticleState = {
    article: Article;
};

const slice = createSlice({
    name: 'article',
    initialState: { article: {} } as ArticleState,
    reducers: {
        setTitle(state, { payload }) {
            state.article.title = payload;
        },
        setCover(state, { payload }) {
            state.article.cover = payload;
        },
        setArticleCategory(state, { payload }) {
            state.article.category = payload;
        },
        setTags(state, { payload }) {
            state.article.tags = payload;
        },
        resetArticle(state) {
            state.article = {
                _id: '',
                title: '',
                cover: '',
                blocks: [],
                tags: [],
                category: { name: '', key: '', game: '' },
                author: { _id: '', username: '', avatar: '', subscribers_count: 0 },
                reading_time: 0,
                created_on: 0,
                isPublished: false,
            };
        },
    },
    extraReducers(builder) {
        // get article
        builder.addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
            state.article = payload.article;
        });
    },
});

export const { setTitle, setCover, setArticleCategory, setTags, resetArticle } = slice.actions;

export default slice.reducer;

export const selectArticle = (state: RootState) => state.article.article;

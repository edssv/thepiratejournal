import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi } from '../services';
import type { RootState } from '../store';

type EditorPageState = {
    mode: 'new' | 'editing' | 'draft' | null;
    articleType: 'article' | 'blog' | null;
    formStatus: 'unchanged' | 'modified' | 'saved';
    data: Partial<Article>;
};

const initialState: EditorPageState = {
    mode: null,
    articleType: null,
    formStatus: 'unchanged',
    data: {},
};

const slice = createSlice({
    name: 'editor-page',
    initialState,
    reducers: {
        setMode(state, { payload }) {
            state.mode = payload;
        },
        setArticleType(state, { payload }) {
            state.articleType = payload;
        },
        setFormStatus(state, { payload }) {
            state.formStatus = payload;
        },
        resetData(state) {
            state.data = {};
        },
        setTitle: (state, { payload }) => {
            state.data.title = payload;
        },
        setDescription: (state, { payload }) => {
            state.data.description = payload;
        },
        setCover: (state, { payload }) => {
            state.data.cover = payload;
        },
        setTags: (state, { payload }) => {
            state.data.tags = payload;
        },
        setArticleCategory: (state, { payload }) => {
            state.data.category = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(articleApi.endpoints.publishArticle.matchFulfilled, (state) => {
            state.formStatus = 'saved';
        });
        builder.addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
            state.formStatus = 'saved';
            if (state.mode === 'editing') {
                state.data = payload.article;
            }
        });
    },
});

export const {
    setMode,
    setArticleType,
    setFormStatus,
    resetData,
    setTitle,
    setDescription,
    setCover,
    setTags,
    setArticleCategory,
} = slice.actions;

export default slice.reducer;

export const modeSelector = (state: RootState) => state.editorPage.mode;
export const articleTypeSelector = (state: RootState) => state.editorPage.articleType;
export const formStatusSelector = (state: RootState) => state.editorPage.formStatus;
export const editorDataSelector = (state: RootState) => state.editorPage.data;

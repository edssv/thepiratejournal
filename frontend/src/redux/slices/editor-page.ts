import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi, Draft, draftApi } from '../services';
import type { RootState } from '../store';

type EditorPageState = {
    mode: 'new' | 'editing' | 'draft' | null;
    formStatus: 'unchanged' | 'modified' | 'saved';
    data: Partial<Article | Draft>;
};

const initialState: EditorPageState = {
    mode: null,
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
        setFormStatus(state, { payload }) {
            state.formStatus = payload;
        },
        resetData(state) {
            state.data = {};
        },
        setTitle: (state, { payload }) => {
            state.data.title = payload;
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
        builder.addMatcher(articleApi.endpoints.addArticle.matchFulfilled, (state) => {
            state.formStatus = 'saved';
        });
        builder.addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
            state.formStatus = 'saved';
            if (state.mode === 'editing') {
                state.data = payload;
            }
        });
        builder.addMatcher(draftApi.endpoints.createDraft.matchFulfilled, (state) => {
            state.formStatus = 'saved';
        });
        builder.addMatcher(draftApi.endpoints.getDraft.matchFulfilled, (state, { payload }) => {
            state.formStatus = 'saved';
            if (state.mode === 'draft') {
                state.data = payload;
            }
        });
    },
});

export const { setMode, setFormStatus, resetData, setTitle, setCover, setTags, setArticleCategory } = slice.actions;

export default slice.reducer;

export const modeSelector = (state: RootState) => state.editorPage.mode;
export const formStatusSelector = (state: RootState) => state.editorPage.formStatus;
export const editorDataSelector = (state: RootState) => state.editorPage.data;

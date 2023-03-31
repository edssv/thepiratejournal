import { Article } from '@/interfaces/article.interface';
import { EditorFormStatus, EditorPageMode } from '@/lib/enums';
import { createSlice } from '@reduxjs/toolkit';

type EditorPageState = {
    mode: EditorPageMode | null;
    formStatus: EditorFormStatus;
    data: Partial<Article>;
};

const initialState: EditorPageState = {
    mode: null,
    formStatus: EditorFormStatus.UNCHANGED,
    data: {},
};

export const editorPageSlice = createSlice({
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
        // builder.addMatcher(articleApi.endpoints.addArticle.matchFulfilled, (state) => {
        //     state.formStatus = 'saved';
        // });
        // builder.addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
        //     state.formStatus = 'saved';
        //     if (state.mode === 'editing') {
        //         state.data = payload;
        //     }
        // });
        // builder.addMatcher(draftApi.endpoints.createDraft.matchFulfilled, (state) => {
        //     state.formStatus = 'saved';
        // });
        // builder.addMatcher(draftApi.endpoints.getDraft.matchFulfilled, (state, { payload }) => {
        //     state.formStatus = 'saved';
        //     if (state.mode === 'draft') {
        //         state.data = payload;
        //     }
        // });
    },
});

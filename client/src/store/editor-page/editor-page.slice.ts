import { createSlice } from '@reduxjs/toolkit';

import { ArticleCategory, ArticleType, EditorFormStatus } from '@/lib/enums';

import type { InitialState } from './editor-page.interface';

const initialState: InitialState = {
  mode: null,
  formStatus: EditorFormStatus.UNCHANGED,
  articleType: ArticleType.ARTICLE,
  data: { category: ArticleCategory.REVIEWS },
  isLoading: false,
  error: null,
  draftId: null
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
    setArticleType(state, { payload }) {
      state.articleType = payload;
    },
    setDraftId(state, { payload }) {
      state.draftId = payload;
    },
    setEditorData(state, { payload }) {
      state.data = payload;
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
    }
  }
});

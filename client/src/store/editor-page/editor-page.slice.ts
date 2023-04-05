import { ArticleCategory, ArticleType, EditorFormStatus, EditorPageMode } from '@/lib/enums';
import { createSlice } from '@reduxjs/toolkit';
import { getArticle } from './editor-page.actions';
import { InitialState } from './editor-page.interface';

const initialState: InitialState = {
  mode: null,
  formStatus: EditorFormStatus.UNCHANGED,
  articleType: ArticleType.ARTICLE,
  data: { category: ArticleCategory.REVIEWS },
  isLoading: false,
  error: null,
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
    builder
      .addCase(getArticle.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getArticle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.data = payload;
      })
      .addCase(getArticle.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

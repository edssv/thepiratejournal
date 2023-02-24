import { createSlice } from '@reduxjs/toolkit';
import { articleApi } from '../services';
import type { RootState } from '../store';

type UiState = {
    isPublishSnackbarVisible: boolean;
};

const initialState: UiState = {
    isPublishSnackbarVisible: false,
};

const slice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setPublishSnackbarVisible(state, { payload }) {
            state.isPublishSnackbarVisible = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(articleApi.endpoints.addArticle.matchFulfilled, (state) => {
            state.isPublishSnackbarVisible = true;
        });
    },
});

export const { setPublishSnackbarVisible } = slice.actions;

export default slice.reducer;

export const publishSnackbarVisibleSelector = (state: RootState) => state.ui.isPublishSnackbarVisible;

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type UiState = {
    isOpenHamburgerMenu: boolean;
    isOpenNavRail: boolean;
    isPublishSnackbarVisible: boolean;
};

const initialState: UiState = {
    isOpenHamburgerMenu: false,
    isOpenNavRail: true,
    isPublishSnackbarVisible: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsOpenHamburgerMenu(state, { payload }) {
            state.isOpenHamburgerMenu = payload;
        },
        setIsOpenNavRail(state, { payload }) {
            state.isOpenNavRail = payload;
        },
        setPublishSnackbarVisible(state, { payload }) {
            state.isPublishSnackbarVisible = payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addMatcher(articleApi.endpoints.addArticle.matchFulfilled, (state) => {
        //     state.isPublishSnackbarVisible = true;
        // });
    },
});

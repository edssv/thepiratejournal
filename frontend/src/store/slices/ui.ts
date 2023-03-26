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

const slice = createSlice({
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

export const { setIsOpenHamburgerMenu, setIsOpenNavRail, setPublishSnackbarVisible } = slice.actions;

export default slice.reducer;

export const isOpenHamburgerMenuSelector = (state: RootState) => state.ui.isOpenHamburgerMenu;
export const isOpenNavRailSelector = (state: RootState) => state.ui.isOpenNavRail;
export const publishSnackbarVisibleSelector = (state: RootState) => state.ui.isPublishSnackbarVisible;

import { createSlice } from '@reduxjs/toolkit';

type UiState = {
  isOpenHamburgerMenu: boolean;
  isOpenNavRail: boolean;
  alert: string | null;
};

const initialState: UiState = {
  isOpenHamburgerMenu: false,
  isOpenNavRail: true,
  alert: null
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
    setAlert(state, { payload }) {
      state.alert = payload;
    }
  }
});

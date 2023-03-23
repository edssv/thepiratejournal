import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Article } from '../../services';

type HomePageState = {
    signout: {
        authorChoice: Article[];
    };
    data: Partial<Article>;
};

const initialState: HomePageState = {
    signout: { authorChoice: [] },
    data: {},
};

const slice = createSlice({
    name: 'home-page',
    initialState,
    reducers: {
        setSignout(state, { payload }) {
            state.signout.authorChoice = payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, { payload }) => {
            return {
                ...state?.signout?.authorChoice,
                ...payload,
            };
        },
    },
});

export const { setSignout } = slice.actions;

export default slice.reducer;

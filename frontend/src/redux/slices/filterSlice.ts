import { createSlice } from '@reduxjs/toolkit';
import { articleApi } from '../services';
import type { RootState } from '../store';

type Category = 'reviews' | 'solutions' | 'mentions';
type Sort = 'views' | 'recent' | 'appreciations';

type FilterState = {
    category: Category | '';
    sort: Sort | '';
    search: string;
    tag: string;
    query: string;
};

const initialState: FilterState = {
    category: '',
    sort: '',
    search: '',
    tag: '',
    query: '',
};

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, { payload }) {
            state.category = payload ?? '';
        },
        setSort(state, { payload }) {
            state.sort = payload;
        },
        setSearch(state, { payload }) {
            state.search = payload;
        },
        setTag(state, { payload }) {
            state.tag = payload;
        },
        setQuery(state, { payload }) {
            state.query = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(articleApi.endpoints.addArticle.matchFulfilled, (state) => {});
    },
});

export const { setCategory, setSort, setQuery, setTag, setSearch } = slice.actions;

export default slice.reducer;

export const selectFilter = (state: RootState) => state.filter;

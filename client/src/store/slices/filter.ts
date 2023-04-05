import { createSlice } from '@reduxjs/toolkit';
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

export const filterSlice = createSlice({
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
});

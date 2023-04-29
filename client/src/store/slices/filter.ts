import { createSlice } from '@reduxjs/toolkit';

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
  query: '',
  search: '',
  sort: '',
  tag: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.category = payload ?? '';
    },
    setQuery(state, { payload }) {
      state.query = payload;
    },
    setSearch(state, { payload }) {
      state.search = payload;
    },
    setSort(state, { payload }) {
      state.sort = payload;
    },

    setTag(state, { payload }) {
      state.tag = payload;
    }
  }
});

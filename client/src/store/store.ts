import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { api } from '@/services/api/api';

import { editorPageSlice } from './editor-page/editor-page.slice';
import articlePageReducer from './slices/article-page';
import { filterSlice } from './slices/filter';
import { uiSlice } from './slices/ui';
import { userSlice } from './user/user.slice';


const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  articlePage: articlePageReducer,
  editorPage: editorPageSlice.reducer,
  filter: filterSlice.reducer,
  user: userSlice.reducer,
  ui: uiSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

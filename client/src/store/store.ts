import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlePageReducer from './slices/article-page';
import { editorPageSlice } from './editor-page/editor-page.slice';
import { filterSlice } from './slices/filter';
import { uiSlice } from './slices/ui';
import { userSlice } from './user/user.slice';
import { api } from '@/services/api/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  articlePage: articlePageReducer,
  editorPage: editorPageSlice.reducer,
  filter: filterSlice.reducer,
  user: userSlice.reducer,
  ui: uiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

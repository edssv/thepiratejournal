import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { api } from './services/api';
import authReducer from './slices/auth';
import articlePageReducer from './slices/article-page';
import editorPageReducer from './slices/editor-page';
import filterReducer from './slices/filter';
import userReducer from './slices/user';
import uiReducer from './slices/ui';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        articlePage: articlePageReducer,
        editorPage: editorPageReducer,
        user: userReducer,
        filter: filterReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(store, { debug: true });

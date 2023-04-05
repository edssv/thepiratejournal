import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import articleReducer from './slices/article';
import authReducer from './slices/auth';
import editorPageReducer from './slices/editor-page';
import uiReducer from './slices/ui';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        article: articleReducer,
        auth: authReducer,
        editorPage: editorPageReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

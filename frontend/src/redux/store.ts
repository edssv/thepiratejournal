import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import authReducer from './slices/auth';
import articleReducer from './slices/article';
import editorPageReducer from './slices/editor-page';
import filterReducer from './slices/filter';
import userReducer from './slices/user';
import uiReducer from './slices/ui';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    article: articleReducer,
    editorPage: editorPageReducer,
    user: userReducer,
    filter: filterReducer,
    ui: uiReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

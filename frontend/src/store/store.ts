import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { api } from '../services/api';
import authReducer from './slices/auth';
import articlePageReducer from './slices/article-page';
import editorPageReducer from './slices/editor-page';
import filterReducer from './slices/filter';
import homeReducer from './slices/home-page';
import userReducer from './slices/user';
import uiReducer from './slices/ui';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    articlePage: articlePageReducer,
    editorPage: editorPageReducer,
    filter: filterReducer,
    homePage: homeReducer,
    user: userReducer,
    ui: uiReducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);

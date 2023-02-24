import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import authReducer from './slices/authSlice';
import articleReducer from './slices/articleSlice';
import filterReducer from './slices/filterSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    article: articleReducer,
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

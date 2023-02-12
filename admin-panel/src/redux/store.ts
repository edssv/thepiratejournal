import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import articleReducer from './slices/articleSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        article: articleReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query';
import { HYDRATE } from 'next-redux-wrapper';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQueryWithRetry(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQueryWithRetry('/refresh', api, extraOptions);
        if (refreshResult.data) {
            // store the new token
            api.dispatch({ type: 'auth/tokenReceived', payload: refreshResult.data });
            // retry the initial query
            result = await baseQueryWithRetry(args, api, extraOptions);
        } else {
            api.dispatch({
                type: 'auth/loggedOut',
            });
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'splitApi',

    baseQuery: baseQueryWithReauth,

    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },

    tagTypes: ['Articles', 'Auth', 'User', 'Notifications'],

    endpoints: () => ({}),
});

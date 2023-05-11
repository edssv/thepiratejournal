import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { retry } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getApiUrl } from '@/lib/apiUrlBuilder';

import { getAccessToken } from '../auth/auth.helper';

import { CLIENT_URL, SSR_URL } from './api.helper';

const baseQuery = fetchBaseQuery({
  baseUrl: typeof window === 'undefined' ? SSR_URL : CLIENT_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const isRefreshtokenExist = headers.get('authorization');
    const accessToken = getAccessToken();

    if (!isRefreshtokenExist && accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryWithRetry(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQueryWithRetry(getApiUrl.refresh(), api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch({ type: 'user/tokenReceived', payload: refreshResult.data });
      // retry the initial query
      result = await baseQueryWithRetry(args, api, extraOptions);
    } else {
      api.dispatch({
        type: 'user/logout'
      });
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Articles', 'Auth', 'User', 'Blog'],
  endpoints: () => ({})
});

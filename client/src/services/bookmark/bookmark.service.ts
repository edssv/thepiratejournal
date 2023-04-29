import { getApiUrl } from '@/lib/apiUrlBuilder';

import { api } from '../api/api';

export const bookmarkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBookmark: builder.mutation<void, string>({
      query: (id) => ({
        url: getApiUrl.bookmark(id),
        method: 'POST'
      })
    }),
    removeBookmark: builder.mutation<void, string>({
      query: (id) => ({
        url: getApiUrl.bookmark(id),
        method: 'DELETE'
      })
    })
  })
});

export const { useCreateBookmarkMutation, useRemoveBookmarkMutation } = bookmarkApi;

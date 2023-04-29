import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';

import { api } from '../api/api';

import type { SearchResponse } from './article.interface';

export const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchResponse, string>({
      query: (query: string) => getApiUrl.search(query)
    }),
    getTags: builder.query<string[], void>({
      query: () => ApiUrlBuilder.ArticlesTags
    })
  })
});

export const { useGetTagsQuery, useSearchQuery } = articleApi;

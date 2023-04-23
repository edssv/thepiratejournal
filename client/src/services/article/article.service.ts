import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';
import { SearchResponse } from './article.interface';
import { api } from '../api/api';

export const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchResponse, string>({
      query: (query: string) => getApiUrl.search(query),
    }),
    getTags: builder.query<string[], void>({
      query: () => ApiUrlBuilder.ArticlesTags,
    }),
  }),
});

export const { useGetTagsQuery, useSearchQuery } = articleApi;

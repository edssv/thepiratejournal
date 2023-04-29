import { getApiUrl } from '@/lib/apiUrlBuilder';

import { api } from '../api/api';

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    follow: builder.mutation<void, string>({
      query: (id) => ({
        url: getApiUrl.followUser(id),
        method: 'POST'
      })
    }),
    unfollow: builder.mutation<void, string>({
      query: (id) => ({
        url: getApiUrl.followUser(id),
        method: 'DELETE'
      })
    })
  })
});

export const { useFollowMutation, useUnfollowMutation } = followApi;

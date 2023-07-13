import { env } from '@/env.mjs';
import { getClientUserJwt } from '@/lib/client-jwt';

export const LikeService = {
  async create(articleId: number) {
    const jwt = await getClientUserJwt();

    return fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/articles/${articleId}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${jwt}`
      }
    });
  },
  async delete(articleId: number) {
    const jwt = await getClientUserJwt();

    return fetch(`${env.NEXT_PUBLIC_STRAPI_API_URL}/articles/${articleId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${jwt}`
      },
      next: { tags: ['article 5'] }
    });
  }
};

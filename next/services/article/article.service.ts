import { env } from '@/env.mjs';
import type { GetArticleListResponse } from '@/interfaces/get-article-list-res';
import type { GetArticleResponse } from '@/interfaces/get-article-res';
import { getServerUserJwt } from '@/lib/server-jwt';

import type { GetCheckLikeResponse } from '../like/like.helper';

export const ArticleService = {
  async getArticleList() {
    const res = await fetch(`${env.STRAPI_API_URL}/articles?populate=cover&sort[0]=createdAt%3Adesc`, {
      headers: {
        Authorization: `bearer ${env.STRAPI_API_TOKEN}`
      },
      next: { revalidate: 60 }
    });
    return res.json() as Promise<GetArticleListResponse>;
  },
  async getArticle(slug: string) {
    const res = await fetch(`${env.STRAPI_API_URL}/articles/${slug}?populate=author&populate=cover`, {
      headers: {
        Authorization: `bearer ${env.STRAPI_API_TOKEN}`
      },
      next: { revalidate: 120, tags: [`article,${slug}`] }
    });
    return res.json() as Promise<GetArticleResponse>;
  },
  async getUserArticles(slug: string, authorId: number) {
    const res = await fetch(
      `${env.STRAPI_API_URL}/articles/?filters[slug][$ne]=${slug}&filters[author][id]=${authorId}&populate=author&populate=cover&pagination[pageSize]=4`,
      {
        headers: {
          Authorization: `bearer ${env.STRAPI_API_TOKEN}`
        },
        next: { revalidate: 60 }
      }
    );
    return res.json() as Promise<GetArticleListResponse>;
  },
  async getNextArticles(slug: string, authorId: number) {
    const res = await fetch(
      `${env.STRAPI_API_URL}/articles/?filters[slug][$ne]=${slug}&filters[author][id][$ne]=${authorId}&populate=author&populate=cover&pagination[pageSize]=4`,
      {
        headers: {
          Authorization: `bearer ${env.STRAPI_API_TOKEN}`
        },
        next: { revalidate: 60 }
      }
    );
    return res.json() as Promise<GetArticleListResponse>;
  },
  async getManyByUserLike() {
    const jwt = await getServerUserJwt();

    const res = await fetch(`${env.STRAPI_API_URL}/articles/likes`, {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    });
    return res.json() as Promise<GetArticleListResponse>;
  },
  async checkLike(articleId: number) {
    const jwt = await getServerUserJwt();

    const res = await fetch(`${env.STRAPI_API_URL}/articles/${articleId}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${jwt}`
      }
    });
    return res.json() as Promise<GetCheckLikeResponse>;
  }
};

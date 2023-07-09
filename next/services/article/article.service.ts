import { env } from '@/env.mjs';
import type { GetArticleListResponse } from '@/interfaces/get-article-list-res';
import type { GetArticleResponse } from '@/interfaces/get-article-res';

export const ArticleService = {
  async getArticleList() {
    const res = await fetch(`${env.STRAPI_API_URL}/articles?populate=*&sort[0]=createdAt%3Adesc`, {
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
      next: { revalidate: 60 }
    });
    return res.json() as Promise<GetArticleResponse>;
  },
  async getNextArticles(slug: string) {
    const res = await fetch(
      `${env.STRAPI_API_URL}/articles/?filters[slug][$ne]=${slug}&populate=author&populate=cover`,
      {
        headers: {
          Authorization: `bearer ${env.STRAPI_API_TOKEN}`
        },
        next: { revalidate: 60 }
      }
    );
    return res.json() as Promise<GetArticleListResponse>;
  }
};

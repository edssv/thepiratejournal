import type { MetadataRoute } from 'next';

import { env } from '@/env.mjs';
import { getPublicUrl } from '@/lib/public-url-builder';
import { ArticleService } from '@/services/article/article.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await ArticleService.getArticleList(0, 1000);

  return articles.data.map((article) => ({
    url: `${env.NEXT_PUBLIC_APP_URL}${getPublicUrl.blog(article.attributes.slug)}`,
    lastModified: article.attributes.updatedAt,
    changeFrequency: 'yearly',
    priority: 1
  }));
}

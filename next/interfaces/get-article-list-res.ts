import type { Article } from './article';

export interface GetArticleListResponse {
  data: Article[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

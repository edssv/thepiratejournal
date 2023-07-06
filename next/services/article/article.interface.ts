import type { Article } from '@/interfaces/article';

export interface SearchResponse {
  articles: Article[];
  total: number;
}

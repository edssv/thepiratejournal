import { Article } from '@/interfaces/article.interface';

export interface SearchResponse {
    articles: Article[];
    total: number;
}

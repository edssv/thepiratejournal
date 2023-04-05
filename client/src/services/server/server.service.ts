import { serverAxiosClassic } from '@/api/api.interceptor';
import { Article } from '@/interfaces/article.interface';
import { ApiUrlBuilder } from '@/lib/apiUrlBuilder';

export const ServerService = {
    async getAllArticles() {
        const { data } = await serverAxiosClassic<Article[]>({
            url: ApiUrlBuilder.Articles,
            method: 'GET',
        });
        return data;
    },
    async getBestOfWeekArticles() {
        const { data } = await serverAxiosClassic<Article[]>({
            url: ApiUrlBuilder.ArticlesBestOfWeek,
            method: 'GET',
        });
        return data;
    },
};

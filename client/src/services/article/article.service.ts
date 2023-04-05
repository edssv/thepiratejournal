import { useMutation, useQuery } from '@tanstack/react-query';

import { axiosClassic, instance, serverAxiosClassic } from '@/api/api.interceptor';
import { Article } from '@/interfaces/article.interface';
import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';
import { SearchResponse } from './article.interface';

const axiosInstance = (onServer = false) => {
  return onServer ? serverAxiosClassic : axiosClassic;
};

export const ArticleService = {
  async getAll(onServer = false) {
    const { data } = await axiosInstance(onServer)<Article[]>({
      url: ApiUrlBuilder.Articles,
      method: 'GET',
    });
    return data;
  },
  async getOne(id: string, onServer = false) {
    const { data } = await axiosInstance(onServer)<Article>({
      url: `${ApiUrlBuilder.Articles}/${id}`,
      method: 'GET',
    });
    return data;
  },
  async search(query: string) {
    const { data } = await axiosClassic<SearchResponse>({
      url: getApiUrl.search(query),
      method: 'GET',
    });
    return data;
  },
  async getPopular() {
    const { data } = await axiosClassic<Article[]>({
      url: ApiUrlBuilder.ArticlesPopular,
      method: 'GET',
    });
    return data;
  },
  async getBestOfWeek(onServer = false) {
    const { data } = await axiosInstance(onServer)<Article[]>({
      url: ApiUrlBuilder.ArticlesBestOfWeek,
      method: 'GET',
    });
    return data;
  },
  async getNext(id: string) {
    const { data } = await axiosClassic<Article[]>({
      url: `${ApiUrlBuilder.Articles}/${id}/next`,
      method: 'GET',
    });
    return data;
  },
  async getTags() {
    const { data } = await axiosClassic<string[]>({
      url: ApiUrlBuilder.ArticlesTags,
      method: 'GET',
    });
    return data;
  },
  async create(articleData: Partial<Article>) {
    const { data } = await instance<Article>({
      url: getApiUrl.createArticle(),
      method: 'POST',
      data: articleData,
    });
    return data;
  },
  async update(articleData: Partial<Article>) {
    const { data } = await instance<Article>({
      url: getApiUrl.updateArticle(String(articleData.id)),
      method: 'PATCH',
      data: articleData,
    });
    return data;
  },
  async delete(id: string) {
    const { data } = await instance<Article>({
      url: getApiUrl.deleteArticle(id),
      method: 'DELETE',
    });
    return data;
  },
};

export const useGetArticlesQuery = () => {
  return useQuery(['articles'], () => ArticleService.getAll(false));
};

export const useGetBestOfWeekQuery = () => {
  return useQuery(['bestOfWeek'], () => ArticleService.getBestOfWeek(false));
};

export const useGetArticleQuery = (id: string, enabled = true) => {
  return useQuery(['article', id], () => ArticleService.getOne(id), { enabled: enabled });
};

export const useGetSearchQuery = (query: string) => {
  return useQuery(['search', query], () => ArticleService.search(query));
};

export const useGetTags = () => {
  return useQuery(['tags'], ArticleService.getTags);
};

export const useCreateArticleMutation = () => {
  return useMutation(['create article'], ArticleService.create);
};

export const useUpdateArticleMutation = () => {
  return useMutation(['update article'], ArticleService.update);
};

export const useDeleteArticleMutation = () => {
  return useMutation(['delete article'], ArticleService.delete);
};

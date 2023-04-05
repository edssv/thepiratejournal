import { useMutation, useQuery } from '@tanstack/react-query';

import { axiosClassic, instance, serverAxiosClassic } from '@/api/api.interceptor';
import { Blog } from '@/interfaces/blog.interface';
import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';

const axiosInstance = (onServer = false) => {
    return onServer ? serverAxiosClassic : axiosClassic;
};

export const BlogService = {
    async getAll(onServer = false) {
        const { data } = await axiosInstance(onServer)<Blog[]>({
            url: ApiUrlBuilder.Blog,
            method: 'GET',
        });
        return data;
    },
    async getOne(id: string, onServer = false) {
        const { data } = await axiosInstance(onServer)<Blog>({
            url: `${ApiUrlBuilder.Blog}/${id}`,
            method: 'GET',
        });
        return data;
    },
    async create(blogData: Blog) {
        const { data } = await instance<Partial<Blog>>({
            url: ApiUrlBuilder.Blog,
            method: 'POST',
            data: blogData,
        });
        return data;
    },
    async update(blogData: Partial<Blog>) {
        const { data } = await instance<Partial<Blog>>({
            url: getApiUrl.updateArticle(String(blogData.id)),
            method: 'PATCH',
            data: blogData,
        });
        return data;
    },
};

export const useGetAllBlogQuery = () => {
    return useQuery(['blog'], () => BlogService.getAll(false));
};

export const useCreateBlogMutation = () => {
    return useMutation(['create blog'], BlogService.create);
};

export const useUpdateBlogMutation = () => {
    return useMutation(['update blog'], BlogService.update);
};

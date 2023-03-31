import { axiosClassic } from '@/api/api.interceptor';
import { Blog } from '@/interfaces/blog.interface';
import { ApiUrlBuilder } from '@/lib/apiUrlBuilder';

export const BlogService = {
    async getAll() {
        const res = await axiosClassic<Blog[]>({
            url: ApiUrlBuilder.Blog,
            method: 'GET',
        });
        return res.data;
    },

    async getOne(id: string) {
        const res = await axiosClassic<Blog>({
            url: `${ApiUrlBuilder.Blog}/${id}`,
            method: 'GET',
        });
        return res.data;
    },
};

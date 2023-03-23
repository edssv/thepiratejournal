import { api } from './api';

export interface Blog {
    _id: string;
    title: string;
    searchTitle: string;
    description: string;
    cover: string;
    blocks: [];
    tags: [];
    category: { name: string; game: string; key: string };
    readingTime: { type: Number; required: true };
    author: { _id: string; username: string; avatar: string; subscribersCount: number };
    createdAt: number;
    updatedAt: number;
    viewsCount: number;
    isPublished: Boolean;
    isDeleted: Boolean;
}

export const blogApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBlog: build.query<Blog, string>({
            query: (id) => `blog/${id}`,
        }),
        getBlogs: build.query<Blog[], ''>({
            query: () => 'blog',
        }),
    }),
});

export const { useGetBlogQuery, useGetBlogsQuery } = blogApi;

import type { Image } from './strapi-image';

export interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    cover: {
      data: Image;
    };
    createdBy: { id: number; firstname: string; lastname: string };
    updatedBy: { id: number; firstname: string; lastname: string };
    views: number;
    likes: { data: [{ id: number; attributes: [] }] };
  };
}

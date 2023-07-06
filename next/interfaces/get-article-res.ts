import type { Article } from './article';

export interface GetArticleResponse {
  data: Article & {
    attributes: {
      createdBy: { data: { id: number; attributes: { firstname: string; lastname: string } } };
      updatedBy: { data: { id: number; attributes: { firstname: string; lastname: string } } };
    };
  };
}

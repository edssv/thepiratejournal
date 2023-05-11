import type { Article } from '@/gql/__generated__';

export type EditorForm = Pick<Article, 'id' | 'title' | 'body' | 'cover' | 'description'> & { draftId: number };

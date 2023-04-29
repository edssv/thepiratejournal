import type { Article } from '@/interfaces/article.interface';
import type { ArticleType, EditorFormStatus, EditorPageMode } from '@/lib/enums';

export interface InitialState {
  mode: EditorPageMode | null;
  formStatus: EditorFormStatus;
  articleType: ArticleType;
  data: Partial<Article>;
  isLoading: boolean;
  error: string | null;
  draftId: number | null;
}

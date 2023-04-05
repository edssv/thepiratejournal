import { Article } from '@/interfaces/article.interface';
import { ArticleType, EditorFormStatus, EditorPageMode } from '@/lib/enums';

export interface InitialState {
  mode: EditorPageMode | null;
  formStatus: EditorFormStatus;
  articleType: ArticleType;
  data: Partial<Article>;
  isLoading: boolean;
  error: string | null;
}

import { useRouter } from 'next/router';
import type { MutableRefObject } from 'react';
import { useMediaPredicate } from 'react-media-hook';

import Button from '@/components/common/Button/Button';
import type { Block } from '@/gql/__generated__';
import {
  useCreateArticleMutation,
  useCreateBlogMutation,
  useUpdateArticleMutation,
  useUpdateBlogMutation
} from '@/gql/__generated__';
import { readingTime } from '@/helpers';
import { useActions, useAuth } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ArticleType, EditorPageMode, UserRole } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

interface ConfirmButtonProps {
  articleContentRef?: React.Ref<HTMLDivElement>;
  blocks: Block[];
}

const SaveArticle: React.FC<ConfirmButtonProps> = ({ articleContentRef, blocks }) => {
  const { replace } = useRouter();

  const { user } = useAuth();
  const { data, mode, articleType, draftId } = useTypedSelector((state) => state.editorPage);

  const { setAlert } = useActions();
  const [createArticle, { loading: isLoadingCreateArticle, error: isErrorCreateArticle }] = useCreateArticleMutation({
    onCompleted: () => replace(getPublicUrl.home())
  });
  const [updateArticle, { loading: isLoadingUpdateArticle, error: isErrorUpdateArticle }] = useUpdateArticleMutation({
    onCompleted: () => replace(getPublicUrl.home())
  });
  const [createBlog, { loading: isLoadingCreateBlog, error: isErrorCreateBlog }] = useCreateBlogMutation({
    onCompleted: () => replace(getPublicUrl.home())
  });
  const [updateBlog, { loading: isLoadingUpdateBlog, error: isErrorUpdateBlog }] = useUpdateBlogMutation({
    onCompleted: () => replace(getPublicUrl.home())
  });

  const isMobile = useMediaPredicate('(max-width: 551px)');

  const saveArticle = () => {
    const description = (articleContentRef as MutableRefObject<HTMLDivElement>).current.innerText
      .split('.', 2)
      .toString();

    const formData = {
      title: data.title,
      description: data.description ?? description,
      cover: data.cover,
      tags: data.tags,
      category: data.category,
      body: blocks,
      readingTime: readingTime(articleContentRef),
      draftId: Number(draftId)
    };

    if (articleType === ArticleType.BLOG) {
      if (mode === EditorPageMode.EDIT) {
        updateBlog({ variables: { updateBlogInput: { ...formData, id: String(data.id) } } });
      } else createBlog({ variables: { createBlogInput: formData } });
    }

    if (articleType === ArticleType.ARTICLE) {
      if (mode === EditorPageMode.EDIT) {
        updateArticle({ variables: { updateArticleInput: { ...formData, id: Number(data.id) } } });
      } else createArticle({ variables: { createArticleInput: formData } });
    }
  };

  const getSnackbarText = () => {
    if (mode === EditorPageMode.NEW) {
      if (isErrorCreateArticle || isErrorCreateBlog) return 'Не удалось опубликовать статью';
      if (user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN) return 'Статья опубликована';
      return 'Статья отправлена на проверку и в скором времени будет опубликована';
    }
    if (mode === EditorPageMode.EDIT) {
      if (isErrorUpdateArticle || isErrorUpdateBlog) return 'Не удалось опубликовать статью';
      if (user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN) return 'Статья изменена';
      return 'Статья отправлена на проверку и в скором времени будет изменена';
    }
    return null;
  };

  const getButtonText = () => {
    if (mode === EditorPageMode.EDIT) return isMobile ? 'Обновить' : 'Обновить статью';
    return 'Опубликовать';
  };

  return (
    <Button
      isLoading={isLoadingCreateArticle || isLoadingUpdateArticle || isLoadingCreateBlog || isLoadingUpdateBlog}
      variant='filled'
      disabled={
        isLoadingCreateArticle ||
        isLoadingUpdateArticle ||
        isLoadingCreateBlog ||
        isLoadingUpdateBlog ||
        !(data.category && data?.cover && data.description && blocks)
      }
      onClick={() => {
        saveArticle();
        setAlert(getSnackbarText());
      }}
    >
      {getButtonText()}
    </Button>
  );
};

export default SaveArticle;

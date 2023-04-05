import { MutableRefObject } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';

import { readingTime } from '@/helpers';
import { useActions, useAuth } from '@/hooks';
import Button from '@/components/common/Button/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateArticleMutation, useCreateBlogMutation, useUpdateArticleMutation } from '@/services';
import { ArticleType, EditorPageMode, UserRole } from '@/lib/enums';
import { Block } from '@/interfaces/block.interface';

interface ConfirmButtonProps {
  articleContentRef?: React.Ref<HTMLDivElement>;
  blocks: Block[];
}

const SaveArticle: React.FC<ConfirmButtonProps> = ({ articleContentRef, blocks }) => {
  const { replace } = useRouter();

  const { user } = useAuth();
  const { data, mode, articleType } = useTypedSelector((state) => state.editorPage);

  const { setAlert } = useActions();
  const { mutate, isLoading, isError } = useCreateArticleMutation();
  const { mutate: createBlog, isLoading: isLoadingBlog, isError: isErrorBlog } = useCreateBlogMutation();
  const { mutate: updateMutation, isLoading: isLoadingUpdate, isError: isErrorUpdate } = useUpdateArticleMutation();

  const isMobile = useMediaPredicate('(max-width: 551px)');

  const saveArticle = async () => {
    const description = (articleContentRef as MutableRefObject<HTMLDivElement>).current.innerText
      .split('.', 2)
      .toString();

    const formData = Object.assign({
      ...data,
      body: blocks,
      readingTime: readingTime(articleContentRef),
      description: data.description ?? description,
    });

    if (articleType === ArticleType.BLOG) {
      if (mode === EditorPageMode.NEW) {
        createBlog(formData, { onSuccess: () => replace('/') });
      }
    }

    if (articleType === ArticleType.ARTICLE) {
      if (mode === EditorPageMode.EDIT) {
        updateMutation(formData, { onSuccess: () => replace('/') });
      } else mutate(formData, { onSuccess: () => replace('/') });
    }
  };

  const getSnackbarText = () => {
    if (mode === EditorPageMode.NEW) {
      if (isError || isErrorBlog) return 'Не удалось опубликовать статью';
      if (user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN) return 'Статья опубликована';
      return 'Статья отправлена на проверку и в скором времени будет опубликована';
    }
    if (mode === EditorPageMode.EDIT) {
      if (isErrorUpdate) return 'Не удалось опубликовать статью';
      if (user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN) return 'Статья изменена';
      return 'Статья отправлена на проверку и в скором времени будет изменена';
    }
  };

  const getButtonText = () => {
    if (mode === EditorPageMode.EDIT) return isMobile ? 'Обновить' : 'Обновить статью';
    return 'Опубликовать';
  };

  return (
    <Button
      isLoading={isLoading || isLoadingUpdate || isLoadingBlog}
      disabled={isLoading || isLoadingUpdate || isLoadingBlog || !(data.category && data?.cover && data.description)}
      onClick={async () => {
        await saveArticle(), setAlert(getSnackbarText());
      }}
      variant="filled"
    >
      {getButtonText()}
    </Button>
  );
};

export default SaveArticle;

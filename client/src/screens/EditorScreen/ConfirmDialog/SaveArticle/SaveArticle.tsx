import { MutableRefObject } from 'react';
import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';

import { Block, useCreateBlogMutation, useUpdateBlogMutation } from '@/gql/__generated__';
import { useCreateArticleMutation, useUpdateArticleMutation } from '@/services';
import { ArticleType, EditorPageMode, UserRole } from '@/lib/enums';
import { readingTime } from '@/helpers';
import { useActions, useAuth } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import Button from '@/components/common/Button/Button';

interface ConfirmButtonProps {
  articleContentRef?: React.Ref<HTMLDivElement>;
  blocks: Block[];
}

const SaveArticle: React.FC<ConfirmButtonProps> = ({ articleContentRef, blocks }) => {
  const { replace } = useRouter();

  const { user } = useAuth();
  const { data, mode, articleType, draftId } = useTypedSelector((state) => state.editorPage);

  const { setAlert } = useActions();
  const { mutate, isLoading, isError } = useCreateArticleMutation();
  const { mutate: updateMutation, isLoading: isLoadingUpdate, isError: isErrorUpdate } = useUpdateArticleMutation();
  const [createBlog, { loading: isLoadingBlog, error: isErrorBlog }] = useCreateBlogMutation({
    onCompleted: () => replace(getPublicUrl.home()),
  });
  const [updateBlog, { loading: isLoadingUpdateBlog, error: isErrorUpdateBlog }] = useUpdateBlogMutation({
    onCompleted: () => replace(getPublicUrl.home()),
  });

  const isMobile = useMediaPredicate('(max-width: 551px)');

  const saveArticle = async () => {
    const description = (articleContentRef as MutableRefObject<HTMLDivElement>).current.innerText
      .split('.', 2)
      .toString();

    const formData = Object.assign({
      ...data,
      draftId,
      body: blocks,
      readingTime: readingTime(articleContentRef),
      description: data.description ?? description,
    });

    if (articleType === ArticleType.BLOG) {
      if (mode === EditorPageMode.EDIT) {
        updateBlog({ variables: { updateBlogInput: formData } });
      } else createBlog({ variables: { createBlogInput: formData } });
    }

    if (articleType === ArticleType.ARTICLE) {
      if (mode === EditorPageMode.EDIT) {
        updateMutation(formData, { onSuccess: () => replace(getPublicUrl.home()) });
      } else mutate(formData, { onSuccess: () => replace(getPublicUrl.home()) });
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
      isLoading={isLoading || isLoadingUpdate || isLoadingBlog || isLoadingUpdateBlog}
      disabled={
        isLoading ||
        isLoadingUpdate ||
        isLoadingBlog ||
        isLoadingUpdateBlog ||
        !(data.category && data?.cover && data.description && blocks)
      }
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

import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useMediaPredicate } from 'react-media-hook';

import Button from '@/components/common/Button/Button';
import { toast } from '@/components/common/Toaster/useToast';
import { UserArticlesQueryDocument, useCreateArticleMutation, useUpdateArticleMutation } from '@/gql/__generated__';
import type { EditorForm } from '@/interfaces/editor-form.interface';
import { EditorPageMode } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

interface ConfirmButtonProps {
  mode: EditorPageMode;
}

const SaveArticle: React.FC<ConfirmButtonProps> = ({ mode }) => {
  const { replace } = useRouter();
  const methods = useFormContext<EditorForm>();
  const { isValid } = methods.formState;

  const [createArticle, { loading: isLoadingCreateArticle }] = useCreateArticleMutation({
    onCompleted: () => {
      replace(getPublicUrl.dashboard()).then(() => toast({ description: 'Статья опубликована' }));
    },
    onError: () => toast({ description: 'Не удалось опубликовать статью.' }),
    refetchQueries: [{ query: UserArticlesQueryDocument }]
  });
  const [updateArticle, { loading: isLoadingUpdateArticle }] = useUpdateArticleMutation({
    onCompleted: () => {
      replace(getPublicUrl.dashboard()).then(() => toast({ description: 'Статья изменена' }));
    },
    onError: () => toast({ description: 'Не удалось обновить статью.' })
  });

  const isMobile = useMediaPredicate('(max-width: 551px)');

  const saveArticle = (data: EditorForm) => {
    if (mode === EditorPageMode.EDIT) {
      updateArticle({ variables: { updateArticleInput: data } });
    } else createArticle({ variables: { createArticleInput: data } });
  };

  const getButtonText = () => {
    if (mode === EditorPageMode.EDIT) return isMobile ? 'Обновить' : 'Обновить статью';
    return 'Опубликовать';
  };

  return (
    <Button
      disabled={!isValid || isLoadingCreateArticle || isLoadingUpdateArticle}
      isLoading={isLoadingCreateArticle || isLoadingUpdateArticle}
      variant='filled'
      onClick={methods.handleSubmit(saveArticle)}
    >
      {getButtonText()}
    </Button>
  );
};

export default SaveArticle;

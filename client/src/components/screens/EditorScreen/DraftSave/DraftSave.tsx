import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useMediaPredicate } from 'react-media-hook';

import Button from '@/components/common/Button/Button';
import { useCreateDraftMutation, useUpdateDraftMutation } from '@/gql/__generated__';
import type { EditorForm } from '@/interfaces/editor-form.interface';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const DraftSave: React.FC = () => {
  const { replace } = useRouter();
  const { getValues } = useFormContext<EditorForm>();

  const [createDraft, { loading }] = useCreateDraftMutation();
  const [updateDraft, { loading: isLoadingUpdate }] = useUpdateDraftMutation();

  const saveDraft = () => {
    const formData = getValues();

    if (!formData.draftId) {
      createDraft({
        variables: { createDraftInput: formData },
        onCompleted: () => replace(getPublicUrl.home())
      });
    }

    updateDraft({
      variables: { updateDraftInput: formData },
      onCompleted: () => replace(getPublicUrl.home())
    });

    // setFormStatus(EditorFormStatus.SAVED);
  };

  const isMobile = useMediaPredicate('(max-width: 551px)');

  const getButtonText = () => {
    if (isMobile) return 'Черновик';
    return 'Сохранить как черновик';
  };

  return (
    <Button
      disabled={loading || isLoadingUpdate}
      isLoading={loading || isLoadingUpdate}
      variant='filledTonal'
      onClick={saveDraft}
    >
      {getButtonText()}
    </Button>
  );
};

export default DraftSave;

import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';

import Button from '@/components/common/Button/Button';
import type { Block } from '@/gql/__generated__';
import { useCreateDraftMutation, useUpdateDraftMutation } from '@/gql/__generated__';
import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EditorFormStatus } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const DraftSave: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  const { replace } = useRouter();

  const { data, draftId } = useTypedSelector((state) => state.editorPage);

  const { setFormStatus } = useActions();
  const [createDraft, { loading }] = useCreateDraftMutation();
  const [updateDraft, { loading: isLoadingUpdate }] = useUpdateDraftMutation();

  const saveDraft = () => {
    const formData = { ...data, body: blocks };

    if (draftId) {
      updateDraft({
        variables: { updateDraftInput: { ...formData, id: draftId } },
        onCompleted: () => replace(getPublicUrl.community())
      });
    }
    if (!draftId) {
      createDraft({
        variables: { createDraftInput: formData },
        onCompleted: () => replace(getPublicUrl.community())
      });
    }

    setFormStatus(EditorFormStatus.SAVED);
  };

  const isMobile = useMediaPredicate('(max-width: 551px)');

  const getButtonText = () => {
    if (isMobile) return 'Черновик';
    return 'Сохранить как черновик';
  };

  return (
    <Button
      disabled={loading || isLoadingUpdate || !(data.title || blocks.length)}
      isLoading={loading || isLoadingUpdate}
      variant='filledTonal'
      onClick={saveDraft}
    >
      {getButtonText()}
    </Button>
  );
};

export default DraftSave;

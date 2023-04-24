import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';

import { Block, useCreateDraftMutation, useUpdateDraftMutation } from '@/gql/__generated__';
import { useActions } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EditorFormStatus } from '@/lib/enums';
import Button from '@/components/common/Button/Button';

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
        onCompleted: () => replace(getPublicUrl.community()),
      });
    }
    if (!draftId) {
      createDraft({ variables: { createDraftInput: formData }, onCompleted: () => replace(getPublicUrl.community()) });
    }

    setFormStatus(EditorFormStatus.SAVED);
  };

  const getButtonText = () => {
    if (isMobile) return 'Черновик';
    return 'Сохранить как черновик';
  };

  const isMobile = useMediaPredicate('(max-width: 551px)');

  return (
    <Button
      onClick={saveDraft}
      isLoading={loading || isLoadingUpdate}
      disabled={loading || isLoadingUpdate || !(data.title || blocks.length)}
      variant="filledTonal"
    >
      {getButtonText()}
    </Button>
  );
};

export default DraftSave;

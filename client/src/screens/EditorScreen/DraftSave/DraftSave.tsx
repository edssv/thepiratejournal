import { useMediaPredicate } from 'react-media-hook';
import { useRouter } from 'next/router';

import { useActions } from '@/hooks';
import { useCreateDraftMutation, useUpdateDraftMutation } from '@/services';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Block } from '@/interfaces/block.interface';
import { EditorFormStatus } from '@/lib/enums';
import Button from '@/components/common/Button/Button';
import { BlockType } from '@/gql/__generated__';

const DraftSave: React.FC<{ blocks: BlockType[] }> = ({ blocks }) => {
  const { replace } = useRouter();

  const { data, draftId } = useTypedSelector((state) => state.editorPage);

  const { setFormStatus } = useActions();
  const { mutate, isLoading } = useCreateDraftMutation();
  const { mutate: updateDraft, isLoading: isLoadingUpdate } = useUpdateDraftMutation();

  const saveDraft = () => {
    const formData = { ...data, body: blocks };

    if (draftId) {
      updateDraft({ ...formData, id: draftId }, { onSuccess: () => replace(getPublicUrl.home()) });
    }
    if (!draftId) {
      mutate(formData, { onSuccess: () => replace(getPublicUrl.home()) });
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
      isLoading={isLoading || isLoadingUpdate}
      disabled={isLoading || isLoadingUpdate || !(data.title || blocks.length)}
      variant="filledTonal"
    >
      {getButtonText()}
    </Button>
  );
};

export default DraftSave;

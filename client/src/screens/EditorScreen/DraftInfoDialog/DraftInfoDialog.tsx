import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaPredicate } from 'react-media-hook';
import { useRouter } from 'next/router';

import { useActions } from '@/hooks';
import { useCreateDraftMutation } from '@/services';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Block } from '@/interfaces/block.interface';
import { EditorFormStatus } from '@/lib/enums';
import Button from '@/components/common/Button/Button';

const Snackbar = dynamic(() => import('@/components/common/Snackbar/Snackbar'), { ssr: false });

export const DraftInfoDialog: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  const { replace } = useRouter();
  const { setFormStatus } = useActions();
  const { data } = useTypedSelector((state) => state.editorPage);
  const [isOpen, setOpen] = useState(false);
  const { mutate, isLoading, isSuccess, isError } = useCreateDraftMutation();

  const saveDraft = () => {
    const formData = { ...data, body: blocks };

    try {
      mutate(formData);
      setFormStatus(EditorFormStatus.SAVED);
    } catch (error) {}
  };

  const isMobile = useMediaPredicate('(max-width: 551px)');

  return (
    <>
      {isMobile ? (
        <Button
          onClick={() => {
            try {
              saveDraft();
              replace('/');
            } catch (error) {}
          }}
          isLoading={isLoading}
          disabled={isLoading || !data.title}
          variant="filledTonal"
        >
          Черновик
        </Button>
      ) : (
        <Button
          onClick={() => {
            try {
              saveDraft();
              replace('/');
            } catch (error) {}
          }}
          isLoading={isLoading}
          disabled={isLoading || !data?.title}
          variant="filledTonal"
        >
          Сохранить как черновик
        </Button>
      )}
      <Snackbar isOpen={isOpen} close onClose={() => setOpen(false)}>
        {isSuccess ? 'Черновик сохранен' : isError ? 'Не удалось сохранить черновик' : ''}
      </Snackbar>
    </>
  );
};

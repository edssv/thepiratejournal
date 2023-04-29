import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import Button from '@/components/common/Button/Button';
import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
  DialogTitle
} from '@/components/common/Dialog/Dialog';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EditorFormStatus } from '@/lib/enums';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), {
  ssr: false
});

const LeaveDialog: React.FC = () => {
  const router = useRouter();

  const { formStatus } = useTypedSelector((state) => state.editorPage);
  const [isVisible, setIsVisible] = useState(false);

  const handleBrowseAway = useCallback(() => {
    setIsVisible(true);
    router.events.emit('routeChangeError');
    throw new Error('');
  }, [router.events]);
  const handleOff = () => {
    setIsVisible(false);
    router.events.emit('routeChangeComplete');
  };

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    if (formStatus === EditorFormStatus.MODIFIED || formStatus === EditorFormStatus.SAVED) {
      window.addEventListener('beforeunload', handler);
      router.events.on('routeChangeStart', handleBrowseAway);

      return () => {
        window.removeEventListener('beforeunload', handler);
        router.events.off('routeChangeStart', handleBrowseAway);
      };
    }

    return () => {};
  }, [formStatus, router, handleBrowseAway]);
  return (
    <DialogTrigger isVisible={isVisible} onClose={handleOff}>
      <Dialog size='M'>
        <DialogTitle>У тебя есть несохраненные изменения</DialogTitle>
        <DialogContent>Сохранить изменения перед выходом из редактора статьи?</DialogContent>
        <DialogControls>
          <DialogActionButton variant='filled'>Сохранить</DialogActionButton>
          <Button variant='outlined'>Не сохранять</Button>
          <DialogCancelButton onClick={handleOff}>Отмена</DialogCancelButton>
        </DialogControls>
      </Dialog>
    </DialogTrigger>
  );
};

export default LeaveDialog;

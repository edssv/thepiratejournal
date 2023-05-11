import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls
} from '@/components/common/DialogOld/Dialog';
import { useRemoveDraftMutation } from '@/gql/__generated__';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), {
  ssr: false
});

interface LeaveDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveDialog: React.FC<LeaveDialogProps> = ({ isOpen, setIsOpen }) => {
  const { back } = useRouter();
  const { getValues } = useFormContext();

  const [removeDraft] = useRemoveDraftMutation();

  const handleLeave = () => {
    const draftId = getValues('draftId');

    if (!draftId) return;

    removeDraft({ onCompleted: () => back(), variables: { id: draftId } });
  };
  return (
    <DialogTrigger isVisible={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog size='M'>
        <DialogContent>Ты действительно хочешь выйти и отменить все изменения?</DialogContent>
        <DialogControls>
          <DialogActionButton onClick={handleLeave}>Выйти</DialogActionButton>
          <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
        </DialogControls>
      </Dialog>
    </DialogTrigger>
  );
};

export default LeaveDialog;

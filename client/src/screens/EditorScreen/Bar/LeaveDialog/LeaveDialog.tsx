import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useRemoveDraftMutation } from '@/gql/__generated__';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
} from '@/components/common/Dialog/Dialog';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), { ssr: false });

interface LeaveDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveDialog: React.FC<LeaveDialogProps> = ({ isOpen, setIsOpen }) => {
  const { back } = useRouter();

  const { draftId } = useTypedSelector((state) => state.editorPage);

  const [removeDraft] = useRemoveDraftMutation();

  const handleLeave = () => {
    draftId && removeDraft({ variables: { id: draftId } });
    back();
  };
  return (
    <DialogTrigger isVisible={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog size="M">
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

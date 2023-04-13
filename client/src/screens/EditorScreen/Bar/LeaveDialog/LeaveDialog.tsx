import dynamic from 'next/dynamic';

import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
} from '@/components/common/Dialog/Dialog';
import { useRouter } from 'next/router';
import { useDeleteDraftMutation } from '@/services';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), { ssr: false });

interface LeaveDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveDialog: React.FC<LeaveDialogProps> = ({ isOpen, setIsOpen }) => {
  const { back } = useRouter();

  const { draftId } = useTypedSelector((state) => state.editorPage);

  const { mutate: deleteDraft } = useDeleteDraftMutation();

  const handleLeave = () => {
    deleteDraft(String(draftId));
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

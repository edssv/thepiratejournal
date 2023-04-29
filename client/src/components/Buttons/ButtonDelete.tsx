import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import type { Variant } from '../common/Button/Button';
import Button from '../common/Button/Button';
import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
  DialogTitle
} from '../common/Dialog/Dialog';
import DialogTrigger from '../common/DialogTrigger/DialogTrigger';

interface ButtonDeleteProps {
  onPrimaryAction?: any;
  icon?: boolean;
  variant?: Variant;
}

const ButtonDelete: React.FC<PropsWithChildren<ButtonDeleteProps>> = ({
  onPrimaryAction,
  children,
  variant = 'text',
  icon = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button icon={icon} variant={variant} onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
        <Dialog>
          <DialogTitle>Удаление статьи</DialogTitle>
          <DialogContent>Вы действительно хотите удалить статью?</DialogContent>
          <DialogControls>
            <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
            <DialogActionButton
              onClick={() => {
                onPrimaryAction();
                setIsOpen(false);
              }}
            >
              Удалить
            </DialogActionButton>
          </DialogControls>
        </Dialog>
      </DialogTrigger>
    </>
  );
};

export default ButtonDelete;

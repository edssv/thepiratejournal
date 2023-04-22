import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useAuth } from '@/hooks';
import { UserRole } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
  DialogTitle,
} from '@/components/common/Dialog/Dialog';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), { ssr: false });

const PrivateOutlet: React.FC<any> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [isOpen, setOpen] = useState(!user || !user.emailVerified);

  const { push, back } = useRouter();

  if (isLoading) return null;

  if (!user)
    return (
      <>
        <DialogTrigger isVisible={isOpen} clickOutside={false} onClose={setOpen}>
          <Dialog>
            <DialogTitle>Войти</DialogTitle>
            <DialogContent>Чтобы продолжить, тебе необходимо войти в систему</DialogContent>
            <DialogControls>
              <DialogCancelButton
                onClick={() => {
                  setOpen(false);
                  back();
                }}
              >
                Отмена
              </DialogCancelButton>
              <DialogActionButton
                onClick={() => {
                  setOpen(false);
                  push(getPublicUrl.login());
                }}
              >
                Войти
              </DialogActionButton>
            </DialogControls>
          </Dialog>
        </DialogTrigger>
        {children}
      </>
    );

  if (user && user.role === UserRole.ADMIN) return children;

  if (user && !user.emailVerified)
    return (
      <>
        <DialogTrigger isVisible={isOpen} onClose={setOpen}>
          <Dialog>
            <DialogTitle>Учетная запись не активирована</DialogTitle>
            <DialogContent>Чтобы продолжить, тебе необходимо активировать учетную запись.</DialogContent>
            <DialogControls>
              <DialogActionButton
                onClick={() => {
                  setOpen(false);
                  back();
                }}
              >
                Хорошо
              </DialogActionButton>
            </DialogControls>
          </Dialog>
        </DialogTrigger>
        {children}
      </>
    );

  return children;
};

export default PrivateOutlet;

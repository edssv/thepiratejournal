import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
  DialogTitle
} from '@/components/common/DialogOld/Dialog';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), {
  ssr: false
});

const PrivateOutlet: React.FC<any> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const [isOpen, setOpen] = useState(!user || !user.emailVerified);

  const { back, push } = useRouter();

  if (isLoading) return null;

  const havePermisson = user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN;

  if (!user)
    return (
      <>
        <DialogTrigger clickOutside={false} isVisible={isOpen} onClose={setOpen}>
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

  if (havePermisson) return children;

  if (user.role === UserRole.USER)
    return (
      <>
        <DialogTrigger isVisible={isOpen} onClose={setOpen}>
          <Dialog>
            <DialogTitle>Нет доступа к этой странице</DialogTitle>
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

  return null;
};

export default PrivateOutlet;

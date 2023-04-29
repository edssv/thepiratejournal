import { useEffect, useState } from 'react';

import Button from '@/components/common/Button/Button';
import {
  Dialog,
  DialogActionButton,
  DialogCancelButton,
  DialogContent,
  DialogControls,
  DialogTitle
} from '@/components/common/Dialog/Dialog';
import DialogTrigger from '@/components/common/DialogTrigger/DialogTrigger';
import Snackbar from '@/components/common/Snackbar/Snackbar';
import Tippy from '@/components/common/Tippy/Tippy';
import { useAuth } from '@/hooks';
import { useFollowMutation, useUnfollowMutation } from '@/services/follow/follow.service';

interface ButtonFollowProps {
  username: string | undefined;
  hasSubscription: boolean | undefined;
  configuration?: 'icon' | 'text' | 'iconWithText';
}

const ButtonFollow: React.FC<ButtonFollowProps> = ({ username, hasSubscription, configuration }) => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenTippy, setIsOpenTippy] = useState<boolean>(false);

  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation();
  const [unFollow, { isLoading: isLoadingUnFollow }] = useUnfollowMutation();

  const [isFollow, setIsFollow] = useState<boolean>();

  useEffect(() => {
    setIsFollow(hasSubscription);
  }, [hasSubscription]);

  const handleFollow = () => {
    setIsOpenTippy(true);
    setTimeout(() => setIsOpenTippy(false), 3000);

    if (isFollow) {
      setIsFollow(false);
      unFollow(String(user?.id));
    } else {
      setIsFollow(true);
      follow(String(user?.id));
    }
  };

  if (!user) {
    return (
      <Tippy
        description='Чтобы отслеживать обновления авторов, войди в аккаунт.'
        isOpen={isOpen}
        offset={50}
        setIsOpen={setIsOpen}
        title='Следи за обновлениями авторов'
        tooltipPosition='right'
      >
        <Button icon={configuration === 'icon'} variant='filled' onClick={() => setIsOpen(true)}>
          {configuration === 'iconWithText' ? (
            <>
              <span className='material-symbols-outlined'>add_circle</span>
              Подписаться
            </>
          ) : configuration === 'icon' ? (
            <span className='material-symbols-outlined'>person_add</span>
          ) : (
            'Подписаться'
          )}
        </Button>
      </Tippy>
    );
  }

  return (
    <>
      {isFollow ? (
        <>
          <Button
            icon={configuration === 'icon'}
            isActive={isOpen}
            variant='filledTonal'
            onClick={() => setIsOpen(true)}
          >
            {configuration === 'iconWithText' ? (
              <>
                <span className='material-symbols-outlined'>notifications</span>
                Подписка
              </>
            ) : configuration === 'icon' ? (
              <span className='material-symbols-outlined'>person</span>
            ) : (
              'Подписка'
            )}
          </Button>
          <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
            <Dialog>
              <DialogTitle>Отписаться от автора</DialogTitle>
              <DialogContent>Ты точно хочешь отписаться от автора?</DialogContent>
              <DialogControls>
                <DialogCancelButton>Отмена</DialogCancelButton>
                <DialogActionButton
                  onClick={() => {
                    handleFollow();
                    setIsOpen(false);
                  }}
                >
                  Отписаться
                </DialogActionButton>
              </DialogControls>
            </Dialog>
          </DialogTrigger>
          <Snackbar isOpen={isOpenTippy} onClose={() => setIsOpenTippy(false)}>
            Ты подписался на автора
          </Snackbar>
        </>
      ) : (
        <>
          <Button icon={configuration === 'icon'} variant='filled' onClick={handleFollow}>
            {configuration === 'iconWithText' ? (
              <>
                <span className='material-symbols-outlined'>add_circle</span>
                Подписаться
              </>
            ) : configuration === 'icon' ? (
              <span className='material-symbols-outlined'>person_add</span>
            ) : (
              'Подписаться'
            )}
          </Button>
          <Snackbar isOpen={isOpenTippy} onClose={() => setIsOpenTippy(false)}>
            Ты отписался от автора
          </Snackbar>
        </>
      )}
    </>
  );
};

export default ButtonFollow;

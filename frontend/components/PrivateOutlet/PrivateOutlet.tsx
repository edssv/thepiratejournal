'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks';
import { DialogTrigger } from '..';
import { Dialog, DialogActionButton, DialogCancelButton, DialogContent, DialogControls, DialogTitle } from '../Dialog';

export const PrivateOutlet: React.FC<React.PropsWithChildren> = ({ children = {} }) => {
    const { user, isLoading } = useAuth();
    let [isOpen, setOpen] = useState(!user || !user.isActivated);

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
                                    push('/login');
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

    if (user && !user.isActivated)
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

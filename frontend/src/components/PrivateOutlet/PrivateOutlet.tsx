import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { DialogTrigger, Overlay } from '..';
import { Dialog, DialogActionButton, DialogCancelButton, DialogContent, DialogControls, DialogTitle } from '../Dialog';

export const PrivateOutlet = () => {
    const { user, isLoading } = useAuth();
    let [isOpen, setOpen] = React.useState(!user || !user.isActivated);

    const location = useLocation();
    const navigate = useNavigate();

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
                                    navigate(-1);
                                }}
                            >
                                Отмена
                            </DialogCancelButton>
                            <DialogActionButton
                                onClick={() => {
                                    setOpen(false);
                                    navigate('/login', { state: { from: location } });
                                }}
                            >
                                Войти
                            </DialogActionButton>
                        </DialogControls>
                    </Dialog>
                </DialogTrigger>
                <Outlet />
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
                                    navigate(-1);
                                }}
                            >
                                Хорошо
                            </DialogActionButton>
                        </DialogControls>
                    </Dialog>
                </DialogTrigger>

                <Outlet />
            </>
        );
    else return <Outlet />;
};

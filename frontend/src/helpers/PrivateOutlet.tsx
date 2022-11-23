import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AlertDialog, DialogContainer, ProgressCircle } from '@adobe/react-spectrum';
import { Overlay } from '../components';

export const PrivateOutlet = () => {
    let [isOpen, setOpen] = React.useState(false);

    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <ProgressCircle
                position="absolute"
                isIndeterminate
                size="L"
                left="50%"
                top="50%"
                aria-label="Загрузка..."
            />
        );

    if (isLoading) return <Overlay />;

    if (!user)
        return (
            <>
                <DialogContainer onDismiss={() => setOpen(false)}>
                    <AlertDialog
                        variant="confirmation"
                        title="Войти"
                        primaryActionLabel="Войти"
                        onPrimaryAction={() => navigate('/login', { state: { from: location } })}
                        cancelLabel="Отмена"
                        onCancel={() => navigate(-1)}>
                        Чтобы продолжить, вам необходимо войти в систему.
                        <br />
                        Хотите войти сейчас?
                    </AlertDialog>
                </DialogContainer>
                <Outlet />
            </>
        );

    if (user && !user.isActivated)
        return (
            <>
                <DialogContainer onDismiss={() => setOpen(false)}>
                    <AlertDialog
                        width="100%"
                        maxWidth={600}
                        variant="warning"
                        title="Учетная запись не активирована"
                        primaryActionLabel="Понятно"
                        onPrimaryAction={() => navigate(-1)}>
                        Чтобы продолжить, вам необходимо активировать учетную запись. <br /> Ссылка
                        для активации была отправлена на ваш электронный адрес.
                    </AlertDialog>
                </DialogContainer>
                <Outlet />
            </>
        );
    else return <Outlet />;
};

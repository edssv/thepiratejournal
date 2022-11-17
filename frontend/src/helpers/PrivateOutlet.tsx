import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    DialogTrigger,
    ActionButton,
    AlertDialog,
    DialogContainer,
    ProgressCircle,
} from '@adobe/react-spectrum';
import { useGetCurrentUserQuery } from '../redux/services/auth';

export function PrivateOutlet() {
    let [isOpen, setOpen] = React.useState(false);
    const { isLoading } = useGetCurrentUserQuery('');

    const { user } = useAuth();
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
}

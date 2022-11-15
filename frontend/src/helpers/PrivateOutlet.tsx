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

    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <ProgressCircle
                position="absolute"
                isIndeterminate
                size="M"
                left="50%"
                top="45%"
                aria-label="Загрузка..."
            />
        );

    if (!auth)
        return (
            <>
                <DialogContainer onDismiss={() => setOpen(false)}>
                    <AlertDialog
                        width="100%"
                        maxWidth={600}
                        variant="information"
                        title="Учетная запись не активирована"
                        primaryActionLabel="Понятно"
                        onPrimaryAction={() => navigate(-1)}>
                        Чтобы продолжить, вам необходимо активировать учетную запись. <br /> Ссылка
                        для активации была отправлена на ваш элетронный адрес.
                    </AlertDialog>
                </DialogContainer>
                <Outlet />
            </>
        );
    if (auth) return <Outlet />;

    return (
        <>
            <DialogContainer onDismiss={() => setOpen(false)}>
                <AlertDialog
                    variant="information"
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
}

import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { DialogTrigger, ActionButton, AlertDialog, DialogContainer } from '@adobe/react-spectrum';

export function PrivateOutlet() {
    let [isOpen, setOpen] = React.useState(false);
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // const navigate = <Navigate to="/login" state={{ from: location }} />;

    if (auth.user && auth.user.isActivated) return <Outlet />;
    if (auth.user)
        return (
            <>
                <DialogContainer onDismiss={() => setOpen(false)}>
                    <AlertDialog
                        variant="information"
                        title="Учетная запись не активирована"
                        primaryActionLabel="Понятно"
                        onPrimaryAction={() => navigate(-1)}>
                        Чтобы продолжить, вам необходимо активировать учетную запись.
                        <br />
                        Ссылка для активации была отправлена на ваш элетронный адрес.
                    </AlertDialog>
                </DialogContainer>
                <Outlet />
            </>
        );
    else
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

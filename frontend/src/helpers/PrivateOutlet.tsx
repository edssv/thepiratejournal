import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { DialogContainer } from '@adobe/react-spectrum';
import { DialogTrigger, Overlay } from '../components';

export const PrivateOutlet = () => {
    const { user, isLoading } = useAuth();
    let [isOpen, setOpen] = React.useState(!user || !user.isActivated);

    const location = useLocation();
    const navigate = useNavigate();

    if (isLoading) return <Overlay />;

    if (!user)
        return (
            <>
                <DialogTrigger
                    isOpen={isOpen}
                    setIsOpen={setOpen}
                    title="Войти"
                    description="Чтобы продолжить, тебе необходимо войти в систему"
                    primaryActionLabel="Войти"
                    onPrimaryAction={() => navigate('/login', { state: { from: location } })}
                    cancelLabel="Отмена"
                    onCancel={() => navigate(-1)}
                />
                <Outlet />
            </>
        );

    if (user && !user.isActivated)
        return (
            <>
                <DialogTrigger
                    isOpen={isOpen}
                    setIsOpen={setOpen}
                    title="Учетная запись не активирована"
                    description="Чтобы продолжить, тебе необходимо активировать учетную запись."
                    primaryActionLabel="Хорошо"
                    onPrimaryAction={() => navigate(-1)}
                />
                <Outlet />
            </>
        );
    else return <Outlet />;
};

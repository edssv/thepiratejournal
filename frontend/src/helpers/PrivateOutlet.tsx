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
import { Overlay } from '../components';

export function PrivateOutlet() {
    let [isOpen, setOpen] = React.useState(false);
    const { isLoading } = useGetCurrentUserQuery('');

    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (isLoading) return <Overlay />;

    return <Outlet />;
}

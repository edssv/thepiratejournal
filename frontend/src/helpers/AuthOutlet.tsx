import { ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGetCurrentUserQuery } from '../redux/services/auth';

export const AuthOutlet = () => {
    const { isLoading } = useGetCurrentUserQuery('');

    const auth = useAuth();
    const location = useLocation();
    const navigate = <Navigate to="/" state={{ from: location }} />;

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

    return auth.user ? navigate : <Outlet />;
};

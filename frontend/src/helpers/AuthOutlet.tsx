import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthOutlet = () => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = <Navigate to="/" state={{ from: location }} />;

    return auth.user ? navigate : <Outlet />;
};

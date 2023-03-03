import { Navigate, Outlet } from 'react-router-dom';
import { Overlay } from '../../../components';

import { useGetCurrentUserQuery } from '../../../redux';

export const LoginProtectedOutlet = () => {
    const token = localStorage.getItem('token');
    const { data, isLoading } = useGetCurrentUserQuery('', { skip: !token });

    if (isLoading) return null;

    if (data?.user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks';
import { useGetCurrentUserQuery } from '../redux';

export const ProtectedOutlet = () => {
    const token = localStorage.getItem('token');
    const { data, isLoading } = useGetCurrentUserQuery('', { skip: !token });
    // const { isAuth, isLoading } = useAuth();

    if (isLoading) return <div>Загрузка...</div>;

    if (!data?.user) {
        return <Navigate to={'/login'} />;
    }

    return <Outlet />;
};

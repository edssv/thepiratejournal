import { Navigate, Outlet } from 'react-router-dom';

import { useGetCurrentUserQuery } from '../redux';
import { Overlay } from './Overlay';

export const ProtectedOutlet = () => {
    const token = localStorage.getItem('token');
    const { data, isLoading } = useGetCurrentUserQuery('', { skip: !token });
    // const { isAuth, isLoading } = useAuth();

    if (isLoading) return <Overlay />;

    if (!data?.user) {
        return <Navigate to={'/login'} />;
    }

    return <Outlet />;
};

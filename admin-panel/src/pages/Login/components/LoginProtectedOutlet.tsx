import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../../hooks';

export const LoginProtectedOutlet = () => {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

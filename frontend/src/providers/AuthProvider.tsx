import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks';

import { UseActions } from '@/hooks/useActions';
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper';

const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    const { user } = useAuth();
    const { checkAuth, logout } = UseActions();
    const { pathname } = useRouter();

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            checkAuth();
        }
    }, []);

    useEffect(() => {
        const refreshToken = getRefreshToken();

        if (!refreshToken && user) {
            logout();
        }
    }, [pathname]);

    return children;
};

export default AuthProvider;

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/hooks';
import { useActions } from '@/hooks/useActions';
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper';

const AuthProvider: React.FC<any> = ({ children }) => {
    const { user } = useAuth();
    const { checkAuth, logout } = useActions();
    const { pathname } = useRouter();

    useEffect(() => {
        const accessToken = getAccessToken();

        if (accessToken) {
            checkAuth();
        }
    }, [checkAuth]);

    useEffect(() => {
        const refreshToken = getRefreshToken();

        if (!refreshToken && user) {
            logout();
        }
    }, [pathname, logout, user]);

    return children;
};

export default AuthProvider;

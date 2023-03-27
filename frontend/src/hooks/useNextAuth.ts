import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useAuth(shouldRedirect: boolean = false, privatePage: boolean = false) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session?.error === 'RefreshAccessTokenError') {
            signOut({ callbackUrl: '/login', redirect: shouldRedirect });
        }

        if (session === null) {
            if (privatePage && router.route !== '/login') {
                router.replace('/login');
            }
            setIsAuthenticated(false);
        } else if (session !== undefined) {
            if (router.route === '/login') {
                router.replace('/');
            }
            setIsAuthenticated(true);
        }
    }, [session]);

    return isAuthenticated;
}

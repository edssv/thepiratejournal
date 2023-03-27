import { DefaultSession, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { UserInfo } from '@/interfaces/user.interface';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string;
        accessTokenExpiry: number;
        user: UserInfo;
        error: any;
    }

    interface User {
        accessToken: string;
        accessTokenExpiry: number;
        refreshToken: number;
        user: UserInfo;
    }

    interface Profile {
        sub: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string;
        accessTokenExpiry: number;
        refreshToken: number;
        user: UserInfo;
        error: any;
    }
}

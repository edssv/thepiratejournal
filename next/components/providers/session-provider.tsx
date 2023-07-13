'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export function SessionProvider({ children }: React.PropsWithChildren) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}

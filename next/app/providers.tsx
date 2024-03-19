'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-wrap-balancer';

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider enableSystem attribute='class' defaultTheme='dark'>
      <SessionProvider>
        <Provider>{children}</Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

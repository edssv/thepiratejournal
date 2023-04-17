import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Roboto } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import apolloClient from '@/apollo/client';
import { store } from '@/store';
import AuthProvider from '@/components/providers/AuthProvider';
import CrossScreensSnackbars from '@/components/Snackbars/CrossScreensSnackbars/Component';

import '@/styles/styles.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['cyrillic', 'latin'],
  display: 'block',
  variable: '--roboto-font',
});

const GoogleOneTap = dynamic(() => import('@/components/GoogleOneTap/GoogleOneTap'), { ssr: false });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              <AuthProvider>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
                  <ThemeProvider>
                    {getLayout(<Component {...pageProps} />)}
                    <GoogleOneTap />
                    <CrossScreensSnackbars />
                  </ThemeProvider>
                </GoogleOAuthProvider>
              </AuthProvider>
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}

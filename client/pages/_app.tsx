import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Roboto } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from '@/store';
import { useTheme } from '@/hooks';
import AuthProvider from '@/components/providers/AuthProvider';

import '@/styles/styles.scss';

import CrossScreensSnackbars from '@/components/Snackbars/CrossScreensSnackbars/Component';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'block',
  variable: '--roboto-font',
});

const GoogleOneTap = dynamic(() => import('@/components/GoogleOneTap/GoogleOneTap'), { ssr: false });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useTheme();
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>The Pirate Journal</title>
      </Head>
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <AuthProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
                {getLayout(<Component {...pageProps} />)}
                <GoogleOneTap />
                <CrossScreensSnackbars />
              </GoogleOAuthProvider>
            </AuthProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

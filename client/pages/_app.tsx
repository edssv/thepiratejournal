/* eslint-disable react/no-unknown-property */
import { ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import apolloClient from '@/apollo/client';
import CrossScreensSnackbars from '@/components/Snackbars/CrossScreensSnackbars/Component';
import { Toaster } from '@/components/common/Toaster/Toaster';
import AuthProvider from '@/components/providers/AuthProvider';
import { api } from '@/services/api/api';
import { store } from '@/store/store';
import '@/styles/index.css';
import '@/styles/styles.scss';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
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
  variable: '--roboto-font'
});

const GoogleOneTap = dynamic(() => import('@/components/GoogleOneTap/GoogleOneTap'), {
  ssr: false
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ApiProvider api={api}>
          <Provider store={store}>
            <AuthProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
                <ThemeProvider defaultTheme='system'>
                  {getLayout(<Component {...pageProps} />)}
                  <GoogleOneTap />
                  <Toaster />
                  <CrossScreensSnackbars />
                </ThemeProvider>
              </GoogleOAuthProvider>
            </AuthProvider>
          </Provider>
        </ApiProvider>
      </ApolloProvider>
      <style global jsx>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
    </>
  );
};

export default App;

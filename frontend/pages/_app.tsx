import React, { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from '@/store';
import AuthProvider from '@/providers/AuthProvider';
import RefreshTokenHandler from '@/components/RefreshTokenHandler/RefreshTokenHandler';

import '@/styles/styles.scss';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['cyrillic'],
    display: 'swap',
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [queryClient] = React.useState(() => new QueryClient());
    const [interval, setInterval] = useState(0);
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
                        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
                        <RefreshTokenHandler setInterval={setInterval} />
                    </Provider>
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}

import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import RefreshTokenHandler from '@/components/RefreshTokenHandler/RefreshTokenHandler';

import '../styles/styles.scss';

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

export default function App({ Component, ...rest }: AppPropsWithLayout) {
    const { store, props } = wrapper.useWrappedStore(rest);

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
            <Provider store={store}>
                <SessionProvider session={props.pageProps.session} refetchInterval={interval}>
                    {getLayout(<Component {...props.pageProps} />)}
                    <RefreshTokenHandler setInterval={setInterval} />
                </SessionProvider>
            </Provider>
        </>
    );
}

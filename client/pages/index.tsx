import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { ArticleService } from '@/services';
import { NextPageWithLayout } from './_app';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const HomePage: NextPageWithLayout = () => {
    return (
        <Meta home>
            <HomeScreen />
        </Meta>
    );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['articles'], ArticleService.getAll);
    await queryClient.prefetchQuery(['bestOfWeek'], ArticleService.getBestOfWeek);

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};

export default HomePage;

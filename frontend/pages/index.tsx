import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Article } from '@/interfaces/article.interface';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from './_app';
import { ArticleService } from '@/store';

interface HomeProps {
    articles: Article[];
}

const HomePage: NextPageWithLayout<HomeProps> = ({ articles }) => {
    return <HomeScreen articles={articles} />;
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

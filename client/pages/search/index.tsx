import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { NextPageWithLayout } from '../_app';
import { ArticleService } from '@/services';
import SearchScreen from '@/screens/SearchScreen/SearchScreen';
import Layout from '@/components/layout/Layout';

const SearchPage: NextPageWithLayout = () => {
    return <SearchScreen />;
};

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['search'], () => ArticleService.search('', ''));

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};

export default SearchPage;

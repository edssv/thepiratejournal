import { ReactElement } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import Layout from '@/components/Layout/Layout';
import { GetServerSideProps } from 'next';
import { ArticleService } from '@/services';

const ArticlePage: NextPageWithLayout = () => {
    return (
        <motion.div initial={{ y: 20, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <ArticleScreen mode="default" />;
        </motion.div>
    );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['article'], () => ArticleService.getOne(context?.params?.id));

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};

export default ArticlePage;

import { ReactElement } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import Layout from '@/components/Layout/Layout';

import { BlogService } from '@/services';

const BlogArticlePage: NextPageWithLayout = () => {
    return <ArticleScreen mode="blog" />;
};

BlogArticlePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const queryClient = new QueryClient();
//     if (!params?.id) return null;
//     await queryClient.prefetchQuery(['blog'], BlogService.getOne(params.id));

//     return {
//         props: { dehydratedState: dehydrate(queryClient) },
//     };
// };

export default BlogArticlePage;

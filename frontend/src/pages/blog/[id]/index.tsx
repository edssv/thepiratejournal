import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import Layout from '@/components/Layout/Layout';

const BlogArticlePage: NextPageWithLayout = () => {
    return <ArticleScreen mode="blog" />;
};

BlogArticlePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export default BlogArticlePage;

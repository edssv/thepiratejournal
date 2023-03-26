import { ReactElement } from 'react';

import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import Layout from '@/components/Layout/Layout';

const ArticlePage: NextPageWithLayout = () => {
    return <ArticleScreen mode="default" />;
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export default ArticlePage;

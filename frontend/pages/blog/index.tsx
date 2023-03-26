import { ReactElement } from 'react';

import { NextPageWithLayout } from '../_app';
import BlogScreen from '@/screens/BlogScreen/BlogScreen';
import Layout from '@/components/Layout/Layout';

const BlogPage: NextPageWithLayout = () => {
    return <BlogScreen />;
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export default BlogPage;

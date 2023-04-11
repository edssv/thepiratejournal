import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { NextPageWithLayout } from '../_app';
import { BlogService } from '@/services';
import BlogScreen from '@/screens/BlogScreen/BlogScreen';
import BlogLayout from '@/components/layout/BlogLayout/BlogLayout';
import Meta from '@/components/meta/Meta';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const BlogPage: NextPageWithLayout = () => {
  return <BlogScreen />;
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Meta title="Blog" url={getPublicUrl.blogPage()}>
      <BlogLayout>{page}</BlogLayout>
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['blog'], () => BlogService.getAll(true));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default BlogPage;

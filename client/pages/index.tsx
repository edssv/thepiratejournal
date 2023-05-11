import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import client from '@/apollo/client';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import BlogScreen from '@/components/screens/BlogScreen/BlogScreen';
import type { ArticleListQuery } from '@/gql/__generated__';
import { ArticleListQueryDocument } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import type { NextPageWithLayout } from './_app';

const BlogPage: NextPageWithLayout<{ data: ArticleListQuery }> = ({ data }) => <BlogScreen data={data} />;

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Meta home url={getPublicUrl.home()}>
      <Layout withAnimation>{page}</Layout>
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: ArticleListQueryDocument });

  return {
    props: { data }
  };
};

export default BlogPage;

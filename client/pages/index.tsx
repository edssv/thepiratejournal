import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import client from '@/apollo/client';
import BlogLayout from '@/components/layout/BlogLayout/BlogLayout';
import Meta from '@/components/meta/Meta';
import type { BlogListQuery } from '@/gql/__generated__';
import { BlogListQueryDocument } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import BlogScreen from '@/screens/BlogScreen/BlogScreen';

import type { NextPageWithLayout } from './_app';

const BlogPage: NextPageWithLayout<{ data: BlogListQuery }> = ({ data }) => (
  <BlogScreen data={data} />
);

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Meta home url={getPublicUrl.home()}>
      <BlogLayout>{page}</BlogLayout>
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: BlogListQueryDocument });

  return {
    props: { data }
  };
};

export default BlogPage;

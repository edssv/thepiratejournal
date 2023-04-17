import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import client from '@/apollo/client';
import { BlogListQuery, BlogListQueryDocument } from '@/gql/__generated__';
import { NextPageWithLayout } from '../_app';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import BlogScreen from '@/screens/BlogScreen/BlogScreen';
import BlogLayout from '@/components/layout/BlogLayout/BlogLayout';
import Meta from '@/components/meta/Meta';

const BlogPage: NextPageWithLayout<{ data: BlogListQuery }> = ({ data }) => {
  return <BlogScreen data={data} />;
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Meta title="Blog" url={getPublicUrl.blogPage()}>
      <BlogLayout>{page}</BlogLayout>
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: BlogListQueryDocument });

  return {
    props: { data },
  };
};

export default BlogPage;

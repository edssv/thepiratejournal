import type { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';

import apolloClient from '@/apollo/client';
import BlogLayout from '@/components/layout/BlogLayout/BlogLayout';
import Meta from '@/components/meta/Meta';
import type { BlogQuery } from '@/gql/__generated__';
import { BlogQueryDocument } from '@/gql/__generated__';
import type { Params } from '@/interfaces/params.interface';
import { ArticlePageMode } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';

const BlogArticlePage: NextPageWithLayout<{ data: BlogQuery }> = ({ data }) => {
  const { title, description, cover, id } = data.getOneBlog;

  return (
    <Meta
      description={description}
      image={cover}
      title={title}
      type='article'
      url={getPublicUrl.blog(String(id))}
    >
      <ArticleScreen data={data.getOneBlog} mode={ArticlePageMode.BLOG} />
    </Meta>
  );
};

BlogArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return <BlogLayout>{page}</BlogLayout>;
};

export const getStaticPaths: GetStaticPaths<Params> = () => ({
  paths: [],
  fallback: 'blocking'
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  const { data } = await apolloClient.query({
    query: BlogQueryDocument,
    variables: { id: Number(id) }
  });

  return {
    props: { data },
    revalidate: 60
  };
};

export default BlogArticlePage;

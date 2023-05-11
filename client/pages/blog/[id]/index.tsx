import type { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';

import apolloClient from '@/apollo/client';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import ArticleScreen from '@/components/screens/ArticleScreen/ArticleScreen';
import type { ArticleQuery } from '@/gql/__generated__';
import { ArticleQueryDocument } from '@/gql/__generated__';
import type { Params } from '@/interfaces/params.interface';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const BlogArticlePage: NextPageWithLayout<{ data: ArticleQuery }> = ({ data }) => {
  const { cover, description, id, title } = data.getArticle;

  return (
    <Meta description={description} image={cover} title={title} type='article' url={getPublicUrl.blog(String(id))}>
      <ArticleScreen data={data.getArticle} />
    </Meta>
  );
};

BlogArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout withAnimation>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths<Params> = () => ({
  paths: [],
  fallback: 'blocking'
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  const { data } = await apolloClient.query({
    query: ArticleQueryDocument,
    variables: { id: Number(id) }
  });

  return {
    props: { data },
    revalidate: 60
  };
};

export default BlogArticlePage;

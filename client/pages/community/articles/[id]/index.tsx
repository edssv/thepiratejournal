import { motion } from 'framer-motion';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';

import apolloClient from '@/apollo/client';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import type { ArticleQuery } from '@/gql/__generated__';
import { ArticleQueryDocument } from '@/gql/__generated__';
import type { Params } from '@/interfaces/params.interface';
import { ArticlePageMode } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';

const ArticlePage: NextPageWithLayout<{ data: ArticleQuery }> = ({ data }) => {
  const { title, description, cover, id } = data.getArticle;

  return (
    <Meta description={description} image={cover} title={title} type='article' url={getPublicUrl.article(String(id))}>
      <ArticleScreen data={data.getArticle} mode={ArticlePageMode.ARTICLE} />
    </Meta>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 24, opacity: 0 }} transition={{ duration: 0.3 }}>
        {page}
      </motion.div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = () => ({
  paths: [],
  fallback: 'blocking'
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleId = params?.id;

  const { data } = await apolloClient.query({
    query: ArticleQueryDocument,
    variables: { id: Number(articleId) }
  });

  return {
    props: { data },
    revalidate: 60
  };
};

export default ArticlePage;

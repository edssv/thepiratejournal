import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';

import { ArticleQuery, ArticleQueryDocument } from '@/gql/__generated__';
import apolloClient from '@/apollo/client';
import { ArticlePageMode } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { Params } from '@/interfaces/params.interface';
import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const ArticlePage: NextPageWithLayout<{ data: ArticleQuery }> = ({ data }) => {
  const { title, description, cover, id } = data.getArticle;

  return (
    <Meta title={title} type="article" description={description} image={cover} url={getPublicUrl.article(String(id))}>
      <ArticleScreen data={data} mode={ArticlePageMode.ARTICLE} />
    </Meta>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        {page}
      </motion.div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleId = params?.id;

  const { data } = await apolloClient.query({ query: ArticleQueryDocument, variables: { id: Number(articleId) } });

  return {
    props: { data },
    revalidate: 60,
  };
};

export default ArticlePage;

import { ReactElement } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';

import { ArticleService } from '@/services';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { Params } from '@/interfaces/params.interface';
import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const ArticlePage: NextPageWithLayout<{ articleId: string }> = ({ articleId }) => {
  const { data } = useQuery(['article', articleId], () => ArticleService.getOne(articleId));

  return (
    <Meta
      title={data?.title}
      type="article"
      description={data?.description}
      image={data?.cover}
      url={getPublicUrl.article(String(data?.id))}
    >
      <motion.div
        initial={{ translateY: 20, opacity: 0.5 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ArticleScreen mode="default" />
      </motion.div>
    </Meta>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout changeVisibleHeader>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleId = params?.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['article', articleId], () => ArticleService.getOne(articleId as string, true));

  return {
    props: { dehydratedState: dehydrate(queryClient), articleId },
    revalidate: 60,
  };
};

export default ArticlePage;

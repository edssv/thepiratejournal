import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';

import { BlogService } from '@/services';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { Params } from '@/interfaces/params.interface';
import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import BlogLayout from '@/components/layout/BlogLayout/BlogLayout';
import Meta from '@/components/meta/Meta';
import { ArticlePageMode } from '@/lib/enums';

const BlogArticlePage: NextPageWithLayout<{ id: string }> = ({ id }) => {
  const { data } = useQuery([`get blog ${id}`], () => BlogService.getOne(id));

  return (
    <Meta
      title={data?.title}
      type="article"
      description={data?.description}
      image={data?.cover}
      url={getPublicUrl.blog(String(data?.id))}
    >
      <ArticleScreen mode={ArticlePageMode.BLOG} />
    </Meta>
  );
};

BlogArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <BlogLayout>
      <motion.div initial={{ y: 20, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        {page}
      </motion.div>
    </BlogLayout>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['blog', id], () => BlogService.getOne(String(id), true));

  return {
    props: { dehydratedState: dehydrate(queryClient), id },
    revalidate: 300,
  };
};

export default BlogArticlePage;

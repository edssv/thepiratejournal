import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogQuery, BlogQueryDocument } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { Params } from '@/interfaces/params.interface';
import { NextPageWithLayout } from 'pages/_app';
import ArticleScreen from '@/screens/ArticleScreen/ArticleScreen';
import BlogLayout from '@/components/layout/BlogLayout/BlogLayout';
import Meta from '@/components/meta/Meta';
import { ArticlePageMode } from '@/lib/enums';
import apolloClient from '@/apollo/client';

const BlogArticlePage: NextPageWithLayout<{ data: BlogQuery }> = ({ data }) => {
  const { title, description, cover, id } = data.getOneBlog;

  return (
    <Meta title={title} type="article" description={description} image={cover} url={getPublicUrl.blog(String(id))}>
      <ArticleScreen data={data} mode={ArticlePageMode.BLOG} />
    </Meta>
  );
};

BlogArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return <BlogLayout>{page}</BlogLayout>;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  const { data } = await apolloClient.query({
    query: BlogQueryDocument,
    variables: { id: Number(id) },
  });

  return {
    props: { data },
    revalidate: 60,
  };
};

export default BlogArticlePage;

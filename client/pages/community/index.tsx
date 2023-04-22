import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import apolloClient from '@/apollo/client';
import { HomeSignedOutQuery, HomeSignedOutQueryDocument } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { NextPageWithLayout } from '../_app';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const HomePage: NextPageWithLayout<{ data: HomeSignedOutQuery }> = ({ data }) => {
  return (
    <Meta title="Сообщество" url={getPublicUrl.community()}>
      <HomeScreen data={data} />
    </Meta>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout padding="small">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await apolloClient.query({ query: HomeSignedOutQueryDocument });

  return {
    props: { data },
  };
};

export default HomePage;

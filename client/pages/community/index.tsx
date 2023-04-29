import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

import apolloClient from '@/apollo/client';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import type { HomeSignedOutQuery } from '@/gql/__generated__';
import { HomeSignedOutQueryDocument } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';

import type { NextPageWithLayout } from '../_app';

const HomePage: NextPageWithLayout<{ data: HomeSignedOutQuery }> = ({ data }) => (
  <Meta title='Сообщество' url={getPublicUrl.community()}>
    <HomeScreen data={data} />
  </Meta>
);

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout padding='small'>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await apolloClient.query({ query: HomeSignedOutQueryDocument });

  return {
    props: { data }
  };
};

export default HomePage;

import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import SubscriptionsScreen from '@/screens/SubscriptionsScreen/SubscriptionsScreen';

import type { NextPageWithLayout } from '../../_app';

const SubscriptionsPage: NextPageWithLayout = () => <SubscriptionsScreen />;

SubscriptionsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout padding='medium'>{page}</Layout>;
};

export default SubscriptionsPage;

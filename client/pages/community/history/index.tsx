import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import HistoryScreen from '@/screens/HistoryScreen/HistoryScreen';

import type { NextPageWithLayout } from '../../_app';

const HistoryPage: NextPageWithLayout = () => <HistoryScreen />;

HistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout padding='small'>{page}</Layout>;
};

export default HistoryPage;

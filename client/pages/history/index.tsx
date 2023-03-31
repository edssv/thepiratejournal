import { ReactElement } from 'react';

import { NextPageWithLayout } from '../_app';
import HistoryScreen from '@/screens/HistoryScreen/HistoryScreen';
import Layout from '@/components/layout/Layout';

const HistoryPage: NextPageWithLayout = () => {
    return <HistoryScreen />;
};

HistoryPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export default HistoryPage;

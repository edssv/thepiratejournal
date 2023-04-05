import { ReactElement } from 'react';

import { NextPageWithLayout } from '../_app';
import SubscriptionsScreen from '@/screens/SubscriptionsScreen/SubscriptionsScreen';
import Layout from '@/components/layout/Layout';

const SubscriptionsPage: NextPageWithLayout = () => {
    return <SubscriptionsScreen />;
};

SubscriptionsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout padding="small">{page}</Layout>;
};

export default SubscriptionsPage;

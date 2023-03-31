import Layout from '@/components/layout/Layout';
import NotFoundScreen from '@/screens/NotFoundScreen/NotFoundScreen';
import { NextPageWithLayout } from './_app';

const NotFoundPage: NextPageWithLayout = () => {
    return <NotFoundScreen />;
};

NotFoundPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default NotFoundPage;

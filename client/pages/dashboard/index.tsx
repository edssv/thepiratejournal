import type { NextPageWithLayout } from 'pages/_app';

import { PanelSpinner } from '@/components/common/PanelSpinner/PanelSpinner';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import PrivateOutlet from '@/components/outlets/PrivateOutlet';
import NotFoundPage from '@/components/screens/NotFoundScreen/NotFoundScreen';
import ArticlesScreen from '@/components/screens/dashboard/ArticlesScreen/ArticlesScreen';
import DashboardHeader from '@/components/screens/dashboard/DashboardHeader/DashboardHeader';
import { useUserArticlesQuery } from '@/gql/__generated__';
import { useAuth } from '@/hooks';

const DashboardPage: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { data, error, loading } = useUserArticlesQuery();

  if (loading) return <PanelSpinner height={700} size='superlarge' />;
  if (!data || error) return <NotFoundPage />;

  return (
    <PrivateOutlet>
      <DashboardHeader heading={user?.username ?? ''} />
      <ArticlesScreen data={data} />
    </PrivateOutlet>
  );
};

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots title='Статьи'>
      <Layout>
        <div className='vessel-container'> {page} </div>
      </Layout>
    </Meta>
  );
};

export default DashboardPage;

import type { NextPageWithLayout } from 'pages/_app';

import { PanelSpinner } from '@/components/common/PanelSpinner/PanelSpinner';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import PrivateOutlet from '@/components/outlets/PrivateOutlet';
import NotFoundPage from '@/components/screens/NotFoundScreen/NotFoundScreen';
import DashboardHeader from '@/components/screens/dashboard/DashboardHeader/DashboardHeader';
import DraftsScreen from '@/components/screens/dashboard/DraftsScreen/DraftsScreen';
import { useUserDraftsQuery } from '@/gql/__generated__';
import { useAuth } from '@/hooks';

const DashboardDraftsPage: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { data, error, loading } = useUserDraftsQuery();

  if (loading) return <PanelSpinner height={700} size='superlarge' />;
  if (!data || error) return <NotFoundPage />;

  return (
    <PrivateOutlet>
      <DashboardHeader heading={user?.username ?? ''} />
      <DraftsScreen data={data} />
    </PrivateOutlet>
  );
};

DashboardDraftsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots title='Черновики'>
      <Layout>
        <div className='vessel-container'>{page}</div>
      </Layout>
    </Meta>
  );
};

export default DashboardDraftsPage;

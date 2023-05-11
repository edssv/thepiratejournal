import type { NextPageWithLayout } from 'pages/_app';

import ClientOnly from '@/components/ClientOnly/ClientOnly';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import OnlyUserOutlet from '@/components/outlets/OnlyUserOutlet';
import DashboardHeader from '@/components/screens/dashboard/DashboardHeader/DashboardHeader';
import SettingsScreen from '@/components/screens/dashboard/SettingsScreen/SettingsScreen';
import { useAuth } from '@/hooks';

const DashboardSettingsPage: NextPageWithLayout = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <OnlyUserOutlet>
      <ClientOnly>
        <DashboardHeader heading={user?.username ?? ''} />
        <SettingsScreen user={user} />
      </ClientOnly>
    </OnlyUserOutlet>
  );
};

DashboardSettingsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots title='Настройки'>
      <Layout>
        <div className='vessel-container'>{page}</div>
      </Layout>
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = () => ({ props: {} });

export default DashboardSettingsPage;

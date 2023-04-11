import { useRouter } from 'next/router';

import { useGetUser } from '@/services';
import { NextPageWithLayout } from 'pages/_app';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const ProfilePage: NextPageWithLayout = () => {
  const { query } = useRouter();

  const userId = (query?.id && query?.id[0].toString()) ?? '';

  const { data } = useGetUser(userId, 'articles');

  return (
    <Meta title={data?.username} image={data?.image} url={String(data?.id)}>
      <ProfileScreen />
    </Meta>
  );
};

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout padding="large">{page}</Layout>;
};

export default ProfilePage;

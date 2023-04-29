import { useRouter } from 'next/router';
import type { NextPageWithLayout } from 'pages/_app';

import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import { useUserQuery } from '@/gql/__generated__';
import NotFoundPage from '@/screens/NotFoundScreen/NotFoundScreen';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';

const ProfilePage: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const userId = (query?.id && query?.id[0]) ?? '';
  const articles = (query?.id && query?.id[1]) ?? 'articles';

  const { data, loading } = useUserQuery({
    variables: { id: +userId, articles },
    skip: !isReady
  });

  if (loading || !isReady) return null;

  if (!data) return <NotFoundPage />;

  return (
    <Meta image={data.getUser.image ?? ''} title={data.getUser.username} url={data.getUser.id}>
      <ProfileScreen data={data} />
    </Meta>
  );
};

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout padding='large'>{page}</Layout>;
};

export default ProfilePage;

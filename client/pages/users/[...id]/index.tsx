import { useRouter } from 'next/router';

import { useUserQuery } from '@/gql/__generated__';
import { NextPageWithLayout } from 'pages/_app';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import NotFoundPage from '@/screens/NotFoundScreen/NotFoundScreen';

const ProfilePage: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const userId = (query?.id && query?.id[0]) ?? '';
  const articles = (query?.id && query?.id[1]) ?? 'articles';

  const { data, loading } = useUserQuery({ variables: { id: +userId, articles: articles }, skip: !isReady });

  if (loading || !isReady) return null;

  if (!data?.getUser) return <NotFoundPage />;

  return (
    <Meta title={data.getUser.username} image={data.getUser.image ?? ''} url={data.getUser.id}>
      <ProfileScreen data={data} />
    </Meta>
  );
};

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout padding="large">{page}</Layout>;
};

export default ProfilePage;

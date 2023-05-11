import { useRouter } from 'next/router';
import type { NextPageWithLayout } from 'pages/_app';

import ClientOnly from '@/components/ClientOnly/ClientOnly';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import EditArticleOutlet from '@/components/outlets/EditArticleOutlet';
import PrivateOutlet from '@/components/outlets/PrivateOutlet';
import EditorScreen from '@/components/screens/EditorScreen/EditorScreen';
import NotFoundPage from '@/components/screens/NotFoundScreen/NotFoundScreen';
import { useArticleQuery } from '@/gql/__generated__';
import { EditorPageMode } from '@/lib/enums';

const EditorPage: NextPageWithLayout = () => {
  const { isReady, query } = useRouter();

  const { data, error, loading } = useArticleQuery({ variables: { id: Number(query.articleId) }, skip: !isReady });

  if (loading || !data) return null;
  if (error) return <NotFoundPage />;

  const { body, cover, description, id, title } = data.getArticle;

  return (
    <PrivateOutlet>
      <ClientOnly>
        <EditArticleOutlet authorId={Number(data?.getArticle.user.id)}>
          <EditorScreen article={{ id, title, body, cover, description }} mode={EditorPageMode.EDIT} />
        </EditArticleOutlet>
      </ClientOnly>
    </PrivateOutlet>
  );
};

EditorPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots title='Изменение'>
      <Layout>{page}</Layout>
    </Meta>
  );
};

export default EditorPage;

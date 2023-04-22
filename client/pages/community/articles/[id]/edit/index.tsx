import { useRouter } from 'next/router';

import { useArticleQuery } from '@/gql/__generated__';
import { useActions } from '@/hooks';
import { EditorPageMode } from '@/lib/enums';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';
import { NextPageWithLayout } from 'pages/_app';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import NotFoundPage from '@/screens/NotFoundScreen/NotFoundScreen';

const EditorPage: NextPageWithLayout = () => {
  const { query } = useRouter();

  const { data, loading } = useArticleQuery({
    variables: { id: Number(query.id) },
    onCompleted(data) {
      setEditorData(data.getArticle);
    },
  });

  const { setEditorData } = useActions();

  if (loading) return null;
  if (!data?.getArticle) return <NotFoundPage />;

  return (
    <Meta title="Редактирование статьи">
      <PrivateOutlet>
        <EditorScreen body={data.getArticle.body} mode={EditorPageMode.EDIT} />
      </PrivateOutlet>
    </Meta>
  );
};

EditorPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditorPage;

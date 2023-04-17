import { useRouter } from 'next/router';

import { useDraftQuery } from '@/gql/__generated__';
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

  const { data, loading } = useDraftQuery({
    variables: { id: Number(query.id) },
    onCompleted(data) {
      setEditorData(data.getDraft);
    },
  });

  const { setEditorData } = useActions();

  if (loading) return null;
  if (!data?.getDraft) return <NotFoundPage />;

  return (
    <Meta title="Редактирование статьи">
      <PrivateOutlet>
        <EditorScreen body={data.getDraft.body} mode={EditorPageMode.EDIT} />
      </PrivateOutlet>
    </Meta>
  );
};

EditorPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditorPage;

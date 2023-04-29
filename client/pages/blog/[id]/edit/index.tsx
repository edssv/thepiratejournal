import { useRouter } from 'next/router';
import type { NextPageWithLayout } from 'pages/_app';

import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';
import { useBlogQuery } from '@/gql/__generated__';
import { useActions } from '@/hooks';
import { EditorPageMode } from '@/lib/enums';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';
import NotFoundPage from '@/screens/NotFoundScreen/NotFoundScreen';

const EditorPage: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const { setEditorData, setArticleType } = useActions();

  const { data, loading, error } = useBlogQuery({
    variables: { id: Number(query.id) },
    onCompleted(data) {
      setArticleType('Блог');
      setEditorData(data.getOneBlog);
    },
    skip: !isReady
  });

  if (loading) return null;
  if (error) return <NotFoundPage />;

  return (
    <Meta title='Редактирование статьи'>
      <PrivateOutlet>
        <EditorScreen body={data?.getOneBlog.body} mode={EditorPageMode.EDIT} />
      </PrivateOutlet>
    </Meta>
  );
};

EditorPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default EditorPage;

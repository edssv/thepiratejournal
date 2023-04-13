import { EditorPageMode } from '@/lib/enums';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';
import { NextPageWithLayout } from 'pages/_app';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const EditorPage: NextPageWithLayout = () => {
  return (
    <Meta title="Редактирование статьи">
      <PrivateOutlet>
        <EditorScreen mode={EditorPageMode.EDIT} />
      </PrivateOutlet>
    </Meta>
  );
};

EditorPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EditorPage;

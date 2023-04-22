import { NextPageWithLayout } from 'pages/_app';
import { EditorPageMode } from '@/lib/enums';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';
import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';

const EditorPageNew: NextPageWithLayout = () => {
  return (
    <PrivateOutlet>
      <EditorScreen body={null} mode={EditorPageMode.NEW} />
    </PrivateOutlet>
  );
};

EditorPageNew.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots>
      <Layout padding={null} hiddenContainer>
        {page}
      </Layout>
    </Meta>
  );
};

export default EditorPageNew;

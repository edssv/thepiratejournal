import type { NextPageWithLayout } from 'pages/_app';

import Layout from '@/components/layout/Layout';
import Meta from '@/components/meta/Meta';
import PrivateOutlet from '@/components/outlets/PrivateOutlet/PrivateOutlet';
import { EditorPageMode } from '@/lib/enums';
import EditorScreen from '@/screens/EditorScreen/EditorScreen';

const EditorPageNew: NextPageWithLayout = () => (
  <PrivateOutlet>
    <EditorScreen body={null} mode={EditorPageMode.NEW} />
  </PrivateOutlet>
);

EditorPageNew.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots>
      <Layout hiddenContainer padding={null}>
        {page}
      </Layout>
    </Meta>
  );
};

export default EditorPageNew;

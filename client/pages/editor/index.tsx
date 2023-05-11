import type { NextPageWithLayout } from 'pages/_app';

import BlogHeader from '@/components/layout/Layout/BlogHeader/BlogHeader';
import Layout from '@/components/layout/Layout/Layout';
import Meta from '@/components/meta/Meta';
import PrivateOutlet from '@/components/outlets/PrivateOutlet';
import EditorScreen from '@/components/screens/EditorScreen/EditorScreen';
import { EditorPageMode } from '@/lib/enums';

const EditorPage: NextPageWithLayout = () => (
  <PrivateOutlet>
    <EditorScreen mode={EditorPageMode.NEW} />
  </PrivateOutlet>
);

EditorPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Meta noRobots title='Новая статья'>
      {page}
    </Meta>
  );
};

export default EditorPage;

import type { GetStaticProps } from 'next';

import Meta from '@/components/meta/Meta';
import TermsScreen from '@/components/screens/TermsScreen/TermsScreen';

import type { NextPageWithLayout } from '../_app';

const TermsPage: NextPageWithLayout = () => (
  <Meta noRobots title='Положения и условия'>
    <TermsScreen />
  </Meta>
);

export const getStaticProps: GetStaticProps = () => ({
  props: {}
});

// Page.getLayout = function getLayout(page: React.ReactElement) {
//   return { page };
// };

export default TermsPage;

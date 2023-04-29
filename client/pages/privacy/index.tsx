import type { GetStaticProps } from 'next';

import Meta from '@/components/meta/Meta';
import PrivacyScreen from '@/screens/PrivacyScreen/PrivacyScreen';

import type { NextPageWithLayout } from '../_app';

const TermsPage: NextPageWithLayout = () => (
  <Meta noRobots title='Конфиденциальность'>
    <PrivacyScreen />
  </Meta>
);

export const getStaticProps: GetStaticProps = () => ({
  props: {}
});

// Page.getLayout = function getLayout(page: React.ReactElement) {
//   return { page };
// };

export default TermsPage;

import Layout from '@/components/layout/Layout';
import SearchScreen from '@/screens/SearchScreen/SearchScreen';

import type { NextPageWithLayout } from '../../../_app';

const SearchPage: NextPageWithLayout = () => <SearchScreen />;

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;

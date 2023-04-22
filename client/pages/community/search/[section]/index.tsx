import { NextPageWithLayout } from '../../..//_app';
import SearchScreen from '@/screens/SearchScreen/SearchScreen';
import Layout from '@/components/layout/Layout';

const SearchPage: NextPageWithLayout = () => {
  return <SearchScreen />;
};

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;

import { ReactElement } from 'react';

import { NextPageWithLayout } from '../../_app';
import BookmarksScreen from '@/screens/BookmarksScreen/BookmarksScreen';
import Layout from '@/components/layout/Layout';

const BookmarksPage: NextPageWithLayout = () => {
  return <BookmarksScreen />;
};

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout padding="small">{page}</Layout>;
};

export default BookmarksPage;

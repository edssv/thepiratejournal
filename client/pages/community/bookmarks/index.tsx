import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import BookmarksScreen from '@/screens/BookmarksScreen/BookmarksScreen';

import type { NextPageWithLayout } from '../../_app';

const BookmarksPage: NextPageWithLayout = () => <BookmarksScreen />;

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout padding='small'>{page}</Layout>;
};

export default BookmarksPage;

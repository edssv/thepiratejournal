import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';

import BlogHeader from './BlogHeader/BlogHeader';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

import styles from './BlogLayout.module.scss';

const BlogLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  return (
    <>
      {!isTablet && <Loader />}
      <BlogHeader />
      <main>
        <div className={clsx('padding-medium', 'container-fluid')}>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default BlogLayout;

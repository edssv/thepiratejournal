import { motion } from 'framer-motion';
import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';

import BlogHeader from './BlogHeader/BlogHeader';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

import styles from './BlogLayout.module.scss';

const BlogLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  return (
    <div className={styles.root}>
      {!isTablet && <Loader color="var(--md-sys-color-on-surface)" />}
      <BlogHeader />
      <main>
        <div className={clsx('padding-medium', 'container-fluid')}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogLayout;

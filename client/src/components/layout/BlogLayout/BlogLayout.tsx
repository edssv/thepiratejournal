import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useMediaPredicate } from 'react-media-hook';

import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

import BlogHeader from './BlogHeader/BlogHeader';

const BlogLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  return (
    <>
      {!isTablet && <Loader color='var(--md-sys-color-primary' />}
      <BlogHeader />
      <main>
        <div className={clsx('padding-medium', 'container-fluid')}>
          <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 0.3 }} whileInView={{ y: 0, opacity: 1 }}>
            {children}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogLayout;

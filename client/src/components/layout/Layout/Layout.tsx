import { motion } from 'framer-motion';
import { useMediaPredicate } from 'react-media-hook';

import Loader from '../Loader/Loader';

import BlogHeader from './BlogHeader/BlogHeader';

interface LayoutProps {
  withAnimation?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ children, withAnimation = false }) => {
  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  return (
    <>
      {!isTablet && <Loader color='var(--md-sys-color-on-surface-variant' />}
      <BlogHeader />
      <main>
        <div className='container-fluid pb-16 sm:pb-10'>
          {withAnimation ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              {children}
            </motion.div>
          ) : (
            children
          )}
        </div>
      </main>
      <footer />
    </>
  );
};

export default Layout;

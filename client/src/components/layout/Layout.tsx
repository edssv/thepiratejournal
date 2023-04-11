import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import Header from './Header/Header';
import HamburgerMenu from './Nav/HamburgerMenu/HamburgerMenu';
import Footer from './Footer/Footer';
import NavRail from './Nav/NavRail/NavRail';
import Loader from './Loader/Loader';

import styles from './Layout.module.scss';
interface LayoutProps {
  padding?: 'small' | 'medium' | 'large' | null;
  hiddenContainer?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  padding = 'medium',
  hiddenContainer = false,
}) => {
  const isOpenNavRail = useTypedSelector((state) => state.ui.isOpenNavRail);
  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  return (
    <div className={styles.root}>
      {!isTablet && <Loader />}
      <Header />
      {isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />}
      <main className={clsx(styles.main, isOpenNavRail && styles.withMargin)}>
        <div id="wrapper" className={styles.wrap}>
          <div className={clsx('container-fluid', padding && 'padding-' + padding, hiddenContainer && styles.hidden)}>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

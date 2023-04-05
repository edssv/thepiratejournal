import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import Header from './Header/Header';
import HamburgerMenu from './Nav/HamburgerMenu/HamburgerMenu';
import Footer from './Footer/Footer';
import NavRail from './Nav/NavRail/NavRail';
import Loader from './Loader/Loader';

import styles from './Layout.module.scss';
import BlogHeader from './BlogHeader/BlogHeader';

interface LayoutProps {
  padding?: 'small' | 'medium' | 'large';
  changeVisibleHeader?: boolean;
  isBlog?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  padding = 'medium',
  changeVisibleHeader = false,
  isBlog = false,
}) => {
  const isOpenNavRail = useTypedSelector((state) => state.ui.isOpenNavRail);
  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  const getLayoutContent = () => {
    if (isBlog) {
      return (
        <>
          <BlogHeader />
          <main>
            <div className={clsx('container-fluid', 'padding-' + padding)}>{children}</div>
          </main>
        </>
      );
    }

    return (
      <>
        <Header changeVisible={changeVisibleHeader} />
        {isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />}
        <main className={clsx(isOpenNavRail && 'withMargin')}>
          <div className={clsx('container-fluid', 'padding-' + padding)}>{children}</div>
        </main>
        <Footer />
      </>
    );
  };

  return (
    <>
      {!isTablet && <Loader />}
      <div className={styles.root}>{getLayoutContent()}</div>
    </>
  );
};
export default Layout;

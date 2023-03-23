import { memo } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { isOpenNavRailSelector } from '@/store';
import Header from '../Header/Header';
import HamburgerMenu from '../Nav/components/HamburgerMenu/HamburgerMenu';
import Footer from '../Footer/Footer';
import NavRail from '../Nav/components/NavRail/NavRail';

import styles from './Layout.module.scss';

interface LayoutProps {
    padding?: 'small' | 'medium' | 'large';
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = memo(({ children, padding = 'medium' }) => {
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    return (
        <div className={styles.root}>
            <Header />
            {isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />}
            <main className={clsx(isOpenNavRail && 'withMargin')}>
                <div className={clsx('container-fluid', 'padding-' + padding)}>{children}</div>
            </main>
            <Footer />
        </div>
    );
});

export default Layout;

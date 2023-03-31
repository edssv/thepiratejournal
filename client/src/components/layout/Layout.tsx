import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import Header from './Header/Header';
import HamburgerMenu from './Nav/HamburgerMenu/HamburgerMenu';
import Footer from './Footer/Footer';
import NavRail from './Nav/NavRail/NavRail';

import styles from './Layout.module.scss';
import Loader from './Loader/Loader';

interface LayoutProps {
    padding?: 'small' | 'medium' | 'large';
    changeVisibleHeader?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
    children,
    padding = 'medium',
    changeVisibleHeader = false,
}) => {
    const isOpenNavRail = useTypedSelector((state) => state.ui.isOpenNavRail);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    return (
        <>
            {!isTablet && <Loader />}
            <div className={styles.root}>
                <Header changeVisible={changeVisibleHeader} />
                {isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />}
                <main className={clsx(isOpenNavRail && 'withMargin')}>
                    <div className={clsx('container-fluid', 'padding-' + padding)}>{children}</div>
                </main>
                <Footer />
            </div>
        </>
    );
};
export default Layout;

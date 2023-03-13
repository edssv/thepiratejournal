import { FC, memo } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { isOpenNavRailSelector } from '../../redux';
import { Footer, HamburgerMenu, Header, NavRail } from '..';

import './Layout.scss';

interface LayoutProps {
    padding?: 'small' | 'medium' | 'large';
}

export const Layout: FC<LayoutProps> = memo(({ padding = 'medium' }) => {
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    return (
        <>
            <Header />
            {isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />}
            <main className={isOpenNavRail ? 'withMargin' : ''}>
                <div className={`padding-${padding} container-fluid`}>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
});

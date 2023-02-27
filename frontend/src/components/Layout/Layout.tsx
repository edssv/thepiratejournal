import { FC } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { isOpenNavRailSelector } from '../../redux';
import { Footer, HamburgerMenu, Header, NavRail } from '..';

import './Layout.scss';

export const Layout: FC = () => {
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    return (
        <>
            <Header />
            {isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />}
            <main>
                <div className="container-fluid">
                    <Outlet />
                </div>
            </main>

            {/* <Footer /> */}
        </>
    );
};

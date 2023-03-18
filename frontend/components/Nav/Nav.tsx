'use client';

import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';

import { isOpenNavRailSelector } from '@/redux';
import { HamburgerMenu } from './components/HamburgerMenu';
import { NavRail } from './components/NavRail';

export const Nav = () => {
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    return isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />;
};

import { useMediaPredicate } from 'react-media-hook';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import NavRail from './NavRail/NavRail';

const Nav = () => {
  const { isOpenNavRail } = useTypedSelector((state) => state.ui);
  const isTablet = useMediaPredicate('(max-width: 990.98px)');
  return isTablet ? <HamburgerMenu /> : isOpenNavRail && <NavRail />;
};

export default Nav;

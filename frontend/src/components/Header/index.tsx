import { useMediaPredicate } from 'react-media-hook';

import styles from './Header.module.scss';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

export const Header = () => {
    // media
    const isLaptop = useMediaPredicate('(max-width: 990.98px)');
    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return (
        <header className={styles.root} style={{ position: isLaptop ? 'fixed' : 'relative' }}>
            {isLaptop ? <HeaderMobile /> : fromLaptop && <HeaderDesktop />}
        </header>
    );
};

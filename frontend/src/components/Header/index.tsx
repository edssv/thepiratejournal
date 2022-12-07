import { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { HeaderStrip } from './HeaderStrip';
import { HamburgerMenu } from './HamburgerMenu';

import styles from './Header.module.scss';

export const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    // media
    const isLaptop = useMediaPredicate('(max-width: 990.98px)');
    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return (
        <header className={styles.root} style={{ position: isLaptop ? 'fixed' : 'relative' }}>
            <div className={styles.fixed}>
                <HamburgerMenu open={open} setOpen={setOpen} />{' '}
                <HeaderStrip open={open} setOpen={setOpen} />
            </div>
        </header>
    );
};

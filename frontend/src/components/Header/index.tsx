import { useState } from 'react';
import { HeaderStrip } from './components/HeaderStrip';
import { HamburgerMenu } from './components/HamburgerMenu';

import styles from './Header.module.scss';
import { useMediaPredicate } from 'react-media-hook';

export const Header = () => {
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className={styles.root}>
            <div className={styles.fixed}>
                <HamburgerMenu open={open} setOpen={setOpen} />{' '}
                {isTablet && (
                    <div
                        onClick={() => setOpen(false)}
                        className={`${styles.overlay} ${open ? styles.visible : ''} overlay`}
                    />
                )}{' '}
                <HeaderStrip open={open} setOpen={setOpen} />
            </div>
        </header>
    );
};

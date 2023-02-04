import { useState } from 'react';
import { HeaderStrip } from './components/HeaderStrip';
import { HamburgerMenu } from './components/HamburgerMenu';

import styles from './Header.module.scss';

export const Header = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className={styles.root}>
            <div className={styles.fixed}>
                <HamburgerMenu open={open} setOpen={setOpen} />{' '}
                <HeaderStrip open={open} setOpen={setOpen} />
            </div>
        </header>
    );
};

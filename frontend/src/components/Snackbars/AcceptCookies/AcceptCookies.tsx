import { useState } from 'react';

import { Snackbar } from '../..';

import styles from './AcceptCookies.module.scss';

export const AcceptCookies = () => {
    const isAcceptCookies = localStorage.getItem('isAcceptCookies');
    const [isOpen, setIsOpen] = useState(!isAcceptCookies);

    if (!isAcceptCookies) {
        return (
            <Snackbar
                className={styles.root}
                isOpen={isOpen}
                permanent
                accept
                onClose={() => {
                    localStorage.setItem('isAcceptCookies', 'true');
                    setIsOpen(false);
                }}
                position="center"
            >
                Для правильной работы сайта нам необходимо использовать файлы cookie.
            </Snackbar>
        );
    } else return null;
};

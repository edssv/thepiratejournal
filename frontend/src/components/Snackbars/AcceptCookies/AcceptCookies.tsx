import { Snackbar } from '../..';

import styles from './AcceptCookies.module.scss';

export const AcceptCookies = () => {
    const isAcceptCookies = localStorage.getItem('isAcceptCookies');

    if (isAcceptCookies) {
        return (
            <Snackbar
                className={styles.root}
                isOpen={true}
                permanent
                accept
                onClose={() => localStorage.setItem('isAcceptCookies', 'true')}
                position="center"
            >
                Для правильной работы сайта нам необходимо использовать файлы cookie.
            </Snackbar>
        );
    } else return null;
};

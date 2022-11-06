import React from 'react';
import styles from './Toaster.module.scss';

export const Toaster = () => {
    return (
        <div className={styles.root}>
            <p>
                Ваш компьютер работает в автономном режиме. Проверьте подключение к Интернету и
                повторите попытку.
            </p>
        </div>
    );
};

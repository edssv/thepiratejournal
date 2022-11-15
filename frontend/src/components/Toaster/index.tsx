import React from 'react';
import Airplane from '@spectrum-icons/workflow/Airplane';

import styles from './Toaster.module.scss';

export const Toaster = () => {
    return (
        <div className={styles.root}>
            <div className={styles.label}>
                <Airplane size="S" aria-label="Airplane" />
                <p>
                    Ваш компьютер работает в автономном режиме.
                    <br /> Проверьте подключение к Интернету и повторите попытку.
                </p>
            </div>
        </div>
    );
};

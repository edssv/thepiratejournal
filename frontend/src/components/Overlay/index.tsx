import { ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.wallpaper}></div>
                <ProgressCircle isIndeterminate size="L" aria-label="Загрузка..." />
            </div>
        </div>
    );
};

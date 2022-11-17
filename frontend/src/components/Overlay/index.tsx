import { ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <div className={styles.overplay}>
            <div className={styles.inner}>
                <div className={styles.wallpaper}></div>
                <ProgressCircle
                    position="absolute"
                    isIndeterminate
                    size="L"
                    left="50%"
                    top="50%"
                    aria-label="Загрузка..."
                />
            </div>
        </div>
    );
};

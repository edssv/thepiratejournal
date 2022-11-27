import { ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    return (
        <div className={styles.root}>
            <ProgressCircle isIndeterminate size="L" aria-label="Загрузка..." />
        </div>
    );
};

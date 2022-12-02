import { ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';
import { useMediaPredicate } from 'react-media-hook';

import styles from './Overlay.module.scss';

export const Overlay = () => {
    const isMobile = useMediaPredicate('(max-width: 768px)');

    return (
        <div className={styles.root}>
            <ProgressCircle isIndeterminate size={isMobile ? 'M' : 'L'} aria-label="Загрузка..." />
        </div>
    );
};

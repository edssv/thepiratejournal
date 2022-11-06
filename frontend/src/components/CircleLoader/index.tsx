import React from 'react';

import styles from './CircleLoader.module.scss';

export const CircleLoader = () => {
    return (
        <div className={styles.root}>
            <div className={styles.track}></div>
            <div className={styles.fills}>
                <div className={styles.fillMask1}>
                    <div className={styles.fillSubMask1}>
                        <div className={styles.fill}></div>
                    </div>
                </div>
                <div className={styles.fillMask2}>
                    <div className={styles.fillSubMask2}>
                        <div className={styles.fill}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { Chip } from '../../../../components';

import styles from './SignedOutHero.module.scss';

export const SignedOutHero = () => {
    return (
        <div className={styles.root}>
            <Chip>Обзоры</Chip>
        </div>
    );
};

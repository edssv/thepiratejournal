import React, { PropsWithChildren } from 'react';

import styles from './Chip.module.scss';

export const Chip: React.FC<PropsWithChildren> = ({ children }) => {
    return <button className={styles.root}>{children}</button>;
};

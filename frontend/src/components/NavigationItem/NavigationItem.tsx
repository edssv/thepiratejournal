import React, { PropsWithChildren } from 'react';

import styles from './NavigationItem.module.scss';

export const NavigationItemIcon: React.FC<PropsWithChildren> = ({ children }) => {
    return <span className={`${styles.icon} material-symbols-outlined`}>{children}</span>;
};

export const NavigationItemLabel: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.label}>{children}</div>;
};

export const NavigationItem: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.root}>{children}</div>;
};

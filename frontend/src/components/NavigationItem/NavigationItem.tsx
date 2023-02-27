import React, { PropsWithChildren } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

export const NavigationItemIcon: React.FC<PropsWithChildren> = ({ children }) => {
    return <span className={`${styles.icon} material-symbols-outlined`}>{children}</span>;
};

export const NavigationItemLabel: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.label}>{children}</div>;
};

export const NavigationItem: React.FC<PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];
    return (
        <Link className={`${styles.root} ${currentLocation === props.to ? styles.active : ''}`} {...props}>
            {children}
        </Link>
    );
};

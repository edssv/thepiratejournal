import React, { PropsWithChildren } from 'react';

import styles from './FAB.module.scss';

export type FABProps = {
    size?: 'S' | 'M' | 'L';
};

export const FAB: React.FC<PropsWithChildren<FABProps & React.HTMLAttributes<HTMLButtonElement>>> = ({
    children,
    className,
    size = 'M',
    ...props
}) => {
    return (
        <button
            className={`${styles.root} ${className ?? ''} ${
                size === 'S' ? styles.small : size === 'L' ? styles.large : styles.medium
            }`}
            {...props}
        >
            {children}
        </button>
    );
};

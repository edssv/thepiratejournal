import React, { PropsWithChildren, useState } from 'react';

import styles from './Chip.module.scss';

interface ChipProps {
    selected?: boolean;
}

export const Chip: React.FC<PropsWithChildren<ChipProps & React.HTMLAttributes<HTMLButtonElement>>> = ({
    children,
    selected,
    ...props
}) => {
    return (
        <button className={`${styles.root} ${selected ? styles.selected : ''} `} {...props}>
            {selected && <span className={`${styles.icon} material-symbols-outlined`}>check</span>}
            {children}
        </button>
    );
};

import { ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';

import styles from './Button.module.scss';

export interface ButtonProps {
    children: string;
    spinner?: boolean;
    disabled?: boolean;
    onClick?: any;
    variant: string;
}

export const Button: React.FC<ButtonProps> = ({
    spinner,
    disabled,
    children,
    onClick,
    variant,
}) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`${styles.root} ${variant}`}>
            {spinner && <ProgressCircle size="S" isIndeterminate variant="overBackground" />}
            <span>{children}</span>
        </button>
    );
};

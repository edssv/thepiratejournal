import React from 'react';
import { CircleLoader, MoonLoader } from 'react-spinners';

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
            {spinner && <CircleLoader color="#1472e6" size={16} />}
            <span>{children}</span>
        </button>
    );
};

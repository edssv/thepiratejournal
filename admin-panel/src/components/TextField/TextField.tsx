import React, { ElementType, PropsWithChildren } from 'react';

import styles from './TextField.module.scss';

export interface TextFieldOwnProps extends React.HTMLProps<HTMLInputElement> {
    variant?: 'filled' | 'outlined';
    placeHolder?: string;
}

export const TextField: React.FC<TextFieldOwnProps> = ({ variant = 'filled', ...otherProps }) => {
    return (
        <label className={`${styles.root} ${styles[variant]}`}>
            <input {...otherProps} />
        </label>
    );
};
